import sys
import os

# Run "uv sync" to install the below packages
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()


def load_file(path: str) -> str:
    if not os.path.exists(path):
        print(f"Error: The file '{path}' does not exist.")
        sys.exit(1)

    print("Loading file:", path)
    with open(path, 'r', encoding='utf-8') as file:
        return file.read()


def save_file(path: str, content: str) -> None:
    print("Saving file:", path)
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)


def generate_article_draft(outline: str) -> str:
    print("Generating article draft...")
    example_posts_path = "example_posts"

    if not os.path.exists(example_posts_path):
        raise FileNotFoundError(
            f"The directory '{example_posts_path}' does not exist.")

    example_posts = []
    for filename in os.listdir(example_posts_path):
        if filename.lower().endswith(".md") or filename.lower().endswith(".mdx"):
            with open(os.path.join(example_posts_path, filename), 'r', encoding='utf-8') as file:
                example_posts.append(file.read())

    if not example_posts:
        raise ValueError(
            "No example blog posts found in the 'example_posts' directory.")

    example_posts_str = "\n\n".join(
        f"<example-post-{i+1}>\n{post}\n</example-post-{i+1}>"
        for i, post in enumerate(example_posts)
    )

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
                """
            },
            {
                "role": "user",
                "content": f"""
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
            }
        ]
    )

    generated_text = response.output_text

    if generated_text.strip().startswith("```markdown"):
        lines = generated_text.strip().splitlines()
        if len(lines) > 2 and lines[-1].strip() == "```":
            generated_text = "\n".join(lines[1:-1])

    return generated_text


def main():
    if len(sys.argv) != 2:
        print("Usage: python main.py <outline_file>")
        sys.exit(1)

    outline_file = sys.argv[1]

    outline = load_file(outline_file)

    blog_post_draft = generate_article_draft(outline)

    output_file = outline_file.replace(".txt", "_draft.md")

    save_file(output_file, blog_post_draft)

    print(f"Blog post draft saved to '{output_file}'.")


if __name__ == "__main__":
    main()