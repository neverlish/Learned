import base64
import sys
import os
import concurrent.futures

# Run "uv sync" to install the below packages
import requests
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, Field

load_dotenv(override=True)

client = OpenAI()


def load_file(path: str) -> str:
    if not os.path.exists(path):
        print(f"Error: The file '{path}' does not exist.")
        sys.exit(1)

    print("Loading file:", path)
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def save_file(path: str, content: str) -> None:
    print("Saving file:", path)
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)


def load_and_format_example_posts(
    path: str, allowed_extensions: list[str], required: bool = False
) -> str:
    """Loads and formats example posts from a directory."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"The directory '{path}' does not exist.")

    example_posts = []
    for filename in os.listdir(path):
        if any(filename.lower().endswith(ext) for ext in allowed_extensions):
            with open(os.path.join(path, filename), "r", encoding="utf-8") as file:
                example_posts.append(file.read())

    if required and not example_posts:
        raise ValueError(
            f"No example posts with extensions {allowed_extensions} found in the '{path}' directory."
        )

    return "\n\n".join(
        f"<example-post-{i+1}>\n{post}\n</example-post-{i+1}>"
        for i, post in enumerate(example_posts)
    )


def generate_article_draft(
    outline: str, existing_draft: str | None = None, feedback: str | None = None
) -> str:
    print("Generating article draft...")
    example_posts_str = load_and_format_example_posts(
        "example_posts", [".md", ".mdx"], required=True
    )

    prompt = f"""
                Write a detailed blog post based on the following outline:

                <outline>
                {outline}
                </outline>

                Below are some example blog posts I wrote in the past:
                <example-posts>
                {example_posts_str}
                </example-posts>

                Use the language, tone, style and way of writing from the example posts to generate your draft for the new blog post.
                DON'T use the content from those example posts!

                Return the blog post draft in raw markdown format so that I can directly use it in my markdown-processing pipeline.
                Don't add any additional text or explanations, just return the raw markdown content.
            """

    if existing_draft and feedback:
        example_posts_str += (
            f"\n\n<existing-draft>\n{existing_draft}\n</existing-draft>"
        )
        example_posts_str += f"\n\n<feedback>\n{feedback}\n</feedback>"

        prompt = f"""
            Write an improved version of the following blog post draft:

            <existing-draft>
            {existing_draft}
            </existing-draft>

            The following feedback should be taken into account when writing the improved draft:

            <feedback>
            {feedback}
            </feedback>

            The original draft AND your improved version should be based on the following outline:

            <outline>
            {outline}
            </outline>

            Below are some example blog posts I wrote in the past:
            <example-posts>
            {example_posts_str}
            </example-posts>

            Use the language, tone, style and way of writing from the example posts to generate your draft for the new blog post.
            DON'T use the content from those example posts!

            Return the blog post draft in raw markdown format so that I can directly use it in my markdown-processing pipeline.
            Don't add any additional text or explanations, just return the raw markdown content.
        """

    response = client.responses.create(
        model="gpt-4o",
        input=[
            {
                "role": "developer",
                "content": """
                    You are an expert blog post author who excels at writing engaging educational blog posts.
                    Avoid using marketing language or jargon.
                    Write in a clear, concise, and informative style for an audience that comprises both technical and non-technical readers.
                    The blog post should be structured, informative, and easy to read.

                    If the user provides an existing draft, use it in conjunction with the provided outline and feedback to create an improved draft.
                """,
            },
            {"role": "user", "content": prompt},
        ],
    )

    generated_text = response.output_text

    if generated_text.strip().startswith("```markdown"):
        lines = generated_text.strip().splitlines()
        if len(lines) > 2 and lines[-1].strip() == "```":
            generated_text = "\n".join(lines[1:-1])

    return generated_text


class Evaluation(BaseModel):
    needs_improvement: bool = Field(
        description="Whether the draft needs to be improved"
    )
    feedback: str = Field(description="Feedback on how to improve the draft")


def evaluate_article_draft(draft: str) -> Evaluation:
    print("Evaluating article draft...")
    response = client.responses.parse(
        model="gpt-4o",
        input=[
            {
                "role": "developer",
                "content": """
                    You are an expert blog post evaluator.
                    Your job is to evaluate the quality of the blog post draft and provide feedback on how to improve it.
                    The blog post draft is in raw markdown format and based on an outline provided by the user.
                    Take that outline into account when evaluating the draft.
                    The draft should be evaluated based on the following criteria:
                    - Is the draft informative and easy to read?
                    - Is the draft structured and well-organized?
                    - Is the draft written in a clear, concise, and engaging style?
                    - Is the draft written in a way that is easy to understand for both technical and non-technical readers?
                """,
            },
            {
                "role": "user",
                "content": f"""
                    Evaluate the following blog post draft:
                    <draft>
                    {draft}
                    </draft>

                    Return the feedback as JSON, indicating whether the draft needs to be improved and why.
                """,
            },
        ],
        text_format=Evaluation,
    )

    return response.output_parsed


def generate_thumbnail(article: str) -> bytes:
    print("Generating thumbnail...")

    response = client.images.generate(
        model="gpt-image-1",
        prompt=f"Generate a thumbnail for the following blog post: {article}",
        n=1,
        output_format="jpeg",
        size="1536x1024",
    )

    image_bytes = base64.b64decode(response.data[0].b64_json)
    return image_bytes


def generate_linkedin_post(article: str) -> str:
    print("Generating LinkedIn post...")

    example_posts_str = load_and_format_example_posts(
        "example_linkedin_posts", [".txt"]
    )

    response = client.responses.create(
        model="gpt-4o",
        input=[
            {
                "role": "developer",
                "content": """
                    You are an expert LinkedIn post generator.
                    Your job is to generate a LinkedIn post for a blog post.
                    The LinkedIn post should be a single post that captures the essence of the blog post.
                    It should be informative and engaging.
                """,
            },
            {
                "role": "user",
                "content": f"""
                    Generate a LinkedIn post for the following blog post:
                    <article>
                    {article}
                    </article>

                    Here are some example LinkedIn posts I wrote in the past:
                    <example-posts>
                    {example_posts_str}
                    </example-posts>

                    Use the language, tone, style and way of writing from the example posts to generate your LinkedIn post.
                    DON'T use the content from those example posts!
                """,
            },
        ],
    )

    return response.output_text


def send_slack_notification(message: str) -> None:
    print("Sending Slack notification...")
    response = requests.post(
        "https://slack.com/api/chat.postMessage",
        json={"channel": "C092YQF30BC", "text": message},
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.environ.get('SLACK_ACCESS_TOKEN')}",
        },
    )

    response.raise_for_status()
    data = response.json()

    if data.get("ok"):
        print("Slack notification sent successfully.")
    else:
        raise Exception(f"Failed to send Slack notification: {data.get('error')}")


def main():
    if len(sys.argv) != 2:
        print("Usage: python main.py <outline_file>")
        sys.exit(1)

    outline_file = sys.argv[1]
    outline = load_file(outline_file)

    blog_post_draft = None
    cycles = 0
    evaluation = None

    while True:
        blog_post_draft = generate_article_draft(
            outline,
            existing_draft=blog_post_draft,
            feedback=evaluation.feedback if evaluation else None,
        )
        print("Generated blog post draft:")
        print(blog_post_draft)

        evaluation = evaluate_article_draft(blog_post_draft)
        print("Evaluation result:")
        print(evaluation)

        print("Your feedback on the article:")
        print("--------------------------------")
        print("Hit ENTER to accept the evaluation results without any changes.")
        print(
            "Type 'accept' to accept the article as is (and overwrite any suggested changes)."
        )
        print("Otherwise enter your feedback to improve the article.")
        print("--------------------------------")
        user_feedback = input("Your feedback: ")

        if user_feedback.strip().lower() == "accept":
            evaluation.needs_improvement = False
        elif user_feedback.strip():
            evaluation.needs_improvement = True
            evaluation.feedback = user_feedback

        cycles += 1

        if not evaluation.needs_improvement or (
            cycles > 3 and not user_feedback.strip()
        ):
            break

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_thumbnail = executor.submit(generate_thumbnail, blog_post_draft)
        future_linkedin = executor.submit(generate_linkedin_post, blog_post_draft)

        linkedin_post = future_linkedin.result()
        thumbnail_image = future_thumbnail.result()

    thumbnail_file = outline_file.replace(".txt", "_thumbnail.jpeg")
    with open(thumbnail_file, "wb") as f:
        f.write(thumbnail_image)
    print(f"Thumbnail saved to '{thumbnail_file}'.")

    linkedin_post_file = outline_file.replace(".txt", "_linkedin_post.txt")
    save_file(linkedin_post_file, linkedin_post)
    print(f"LinkedIn post saved to '{linkedin_post_file}'.")

    output_file = outline_file.replace(".txt", "_draft.md")
    save_file(output_file, blog_post_draft)
    print(f"Blog post draft saved to '{output_file}'.")

    send_slack_notification(f"New blog post draft generated!")


if __name__ == "__main__":
    main()