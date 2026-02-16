from datetime import datetime
import json
import os
import sys
from typing import Dict, Any, List, Literal

# Run "uv sync" to install the below packages
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, Field
import requests

import database


load_dotenv()

client = OpenAI()
database.init_db()


class Tool:
    """
    The base class for a tool that can be used by an agent.
    """

    def __init__(
        self,
        name: str,
        description: str,
        parameters: Dict[str, Any],
    ):
        self.name = name
        self.description = description
        self.parameters = parameters

    def get_schema(self) -> Dict[str, Any]:
        """
        Returns the schema for the tool.
        """
        return {
            "type": "function",
            "name": self.name,
            "description": self.description,
            "parameters": {
                "type": "object",
                "properties": self.parameters,
                "additionalProperties": False,
                "required": list(self.parameters.keys()),
            },
        }

    def execute(self, arguments: str) -> str:
        """
        Executes the tool's logic. This method must be implemented by subclasses.
        """
        raise NotImplementedError(
            "Each tool must implement its own execute method.")


class StoreResearchPlanTool(Tool):
    """
    A tool that stores a user's research plan in the database.
    """

    def __init__(self):
        super().__init__(
            name="store_research_plan",
            description="Stores a user's research plan in the database.",
            parameters={
                "short_summary": {
                    "type": "string",
                    "description": "A very short summary title of the research plan.",
                },
                "details": {
                    "type": "string",
                    "description": "The details of the research plan.",
                },
            },
        )

    def execute(self, arguments: str) -> Dict[str, Any]:
        """
        Executes the tool's logic.
        """
        args = json.loads(arguments)
        try:
            result = database.add_research_plan(
                args["short_summary"], args["details"])
            return result
        except Exception as e:
            return {"status": "error", "message": str(e)}


class GetResearchPlansTool(Tool):
    """
    A tool that gets a user's research plans from the database.
    """

    def __init__(self):
        super().__init__(
            name="get_research_plans",
            description="Gets a user's research plans from the database.",
            parameters={},
        )

    def execute(self, arguments: str) -> List[Dict[str, Any]]:
        """
        Executes the tool's logic.
        """
        try:
            result = database.get_research_plans()
            return result
        except Exception as e:
            return [{"status": "error", "message": str(e)}]


class DeleteResearchPlanTool(Tool):
    """
    A tool that deletes a user's research plan from the database.
    """

    def __init__(self):
        super().__init__(
            name="delete_research_plan",
            description="Deletes a user's research plan from the database.",
            parameters={
                "id": {
                    "type": "integer",
                    "description": "The ID of the research plan to delete.",
                },
            },
        )

    def execute(self, arguments: str) -> Dict[str, Any] | None:
        """
        Executes the tool's logic.
        """
        args = json.loads(arguments)
        try:
            result = database.delete_research_plan(args["id"])
            return result
        except Exception as e:
            return {"status": "error", "message": str(e)}


class Agent:
    """
    The base class for an agent that can interact with the OpenAI API.
    """

    def __init__(self, model: str = "gpt-4o"):
        self.client = client
        self.model = model
        self.messages: list[Dict[str, Any]] = []
        self.tools: Dict[str, Tool] = {}

    def register_tool(self, tool: Tool):
        """
        Registers a tool with the agent.
        """
        self.tools[tool.name] = tool

    def _get_tool_schemas(self) -> list[Dict[str, Any]]:
        """
        Returns the list of tool schemas.
        """
        return [tool.get_schema() for tool in self.tools.values()]

    def execute_tool_call(self, tool_call: Any) -> str:
        """
        Executes a tool call and returns the output.
        """
        fn_name = tool_call.name
        fn_args = json.loads(tool_call.arguments)

        if fn_name in self.tools:
            tool_to_call = self.tools[fn_name]
            try:
                print(f"Calling {fn_name} with arguments: {fn_args}")
                # The return value of the function is converted to a string to be compatible with the API.
                return str(tool_to_call.execute(tool_call.arguments))
            except Exception as e:
                return f"Error calling {fn_name}: {e}"

        return f"Unknown tool: {fn_name}"

    def run(self):
        """
        Runs the agent. This method should be implemented by subclasses.
        """
        raise NotImplementedError(
            "The run method must be implemented by a subclass.")


class ResearchPlannerAgent(Agent):
    """
    A research planner agent that uses the tools to plan a research project.
    """

    def __init__(self):
        super().__init__()
        self.register_tool(StoreResearchPlanTool())
        self.register_tool(GetResearchPlansTool())
        self.register_tool(DeleteResearchPlanTool())
        self._set_initial_prompt()

    def _set_initial_prompt(self):
        """
        Sets the initial prompt for the agent.
        """
        self.messages = [
            {
                "role": "developer",
                "content": """
                You are a research planner agent. You are tasked with helping the user plan a web research project.
                The user will provide you with a research task and your job is to create a research plan together with the user.
                Your job is NOT to answer the user's question. Instead, you MUST help them build a good research plan that can then be handed off to some other agent to execute.
                The research plan should include things like:
                    - Core topics to be researched
                    - Related topics
                    - Topics that should be avoided
                    - Time frame for web research (i.e, max age of the web search results)
                """
            }
        ]

    def run(self):
        """
        Runs the agent.
        """
        print("Hi! Please describe today's research task:")
        while True:
            user_input = input(
                "Your Input ('exit' to quit, 'accept' to accept the research plan and continue): ")
            if user_input == "exit":
                print("Exiting.")
                sys.exit(0)
            elif user_input == "accept":
                print("Research plan accepted. Continuing...")
                prompt = "Please create a final version of the discussed research plan and return JUST that plan, nothing else, no other comments."
                self.messages.append({"role": "user", "content": prompt})
                response = self.client.responses.create(
                    model=self.model,
                    input=self.messages,
                )
                print("Here's the final research plan:")
                print(response.output_text)
                return response.output_text

            self.messages.append({"role": "user", "content": user_input})

            while True:
                response = self.client.responses.create(
                    model=self.model,
                    input=self.messages,
                    tools=self._get_tool_schemas(),
                )

                reply = response.output[0]
                self.messages.append(reply)

                if reply.type != "function_call":
                    print(response.output_text)
                    break

                tool_output = self.execute_tool_call(reply)

                self.messages.append(
                    {
                        "type": "function_call_output",
                        "call_id": reply.call_id,
                        "output": tool_output,
                    }
                )


class SearchConfig(BaseModel):
    """
    A search configuration.
    """
    search_terms: list[str]
    freshness: Literal["pd", "pw", "pm", "py"] | str = Field(
        ...,
        description="The freshness of the web search results. pd: past day, pw: past week, pm: past month, py: past year. Or a timeframe YYYY-MM-DDtoYYYY-MM-DD (e.g., 2022-04-01to2022-07-30)"
    )

class WebSearchAgent(Agent):
    """
    A web search agent that uses the tools to search the web.
    """

    def __init__(self):
        super().__init__()
        self._set_initial_prompt()

    def _set_initial_prompt(self):
        """
        Sets the initial prompt for the agent.
        """
        self.messages = [
            {
                "role": "developer",
                "content": f"""
                You are an expert in performing web searches.
                You will be given a research plan and you will need to derive a list of search terms that will be used to perform the search.
                The search terms should be derived from the research plan and should be as specific as possible.
                Focus on deriving impactful search terms that will help the user find the most relevant information.

                Also derive a value for the max age (freshness) of the web search results.
                Today is: {datetime.now().strftime("%Y-%m-%d")}
                """
            }
        ]

    def run(self, research_plan: str):
        """
        Runs the agent.
        """
        print("Deriving search terms...")
        self.messages.append(
            {"role": "user", "content": "Here's the research plan based on which you should derive search terms: " + research_plan})
        response = self.client.responses.parse(
            model=self.model,
            input=self.messages,
            text_format=SearchConfig,
        )

        search = response.output_parsed
        results = []

        for search_term in search.search_terms:
            url = "https://api.search.brave.com/res/v1/web/search"
            headers = {
                "Accept": "application/json",
                "X-Subscription-Token": os.getenv("BRAVE_API_KEY"),
            }
            params = {
                "q": search_term,
                "count": 10,
                "freshness": search.freshness,
            }

            response = requests.get(url, headers=headers, params=params)
            result = response.json()
            if "web" in result:
                web_results = result["web"]["results"]
                for web_result in web_results:
                    results.append({
                        "search_term": search_term,
                        "url": web_result["url"],
                        "description": web_result["description"],
                    })

            if "news" in result:
                news_results = result["news"]["results"]
                for news_result in news_results:
                    results.append({
                        "search_term": search_term,
                        "url": news_result["url"],
                        "description": news_result["description"],
                    })

        return results


class SummaryReportAgent(Agent):
    """
    A summary report agent that uses the tools to summarize the search results.
    """

    def __init__(self):
        super().__init__()
        self._set_initial_prompt()

    def _set_initial_prompt(self):
        """
        Sets the initial prompt for the agent.
        """
        self.messages = [
            {
                "role": "developer",
                "content": """
                You are a summary report agent.
                You will be given a list of search results (which include short descriptions) and you will need to summarize them into a report.
                The report should be in a format that is easy to understand and use.
                It's important that your report includes those URLs (next to the text they belong to) so that users can dive deeper.
                The report should be in Markdown format. Avoid extra explanations, annotations or text, just return the markdown report.
                """
            }
        ]

    def run(self, search_results: list[Dict[str, Any]]):
        """
        Runs the agent.
        """

        print("Summarizing search results...")
        self.messages.append(
            {"role": "user", "content": "Please create a summary (and keep the links!) based on these search results: " + json.dumps(search_results, indent=2)})
        response = self.client.responses.create(
            model=self.model,
            input=self.messages,
        )
        report = response.output_text
        if report.startswith("```markdown"):
            report = report[11:]
        if report.endswith("```"):
            report = report[:-3]
        return report

def main():
    agent = ResearchPlannerAgent()
    research_plan = agent.run()
    search_agent = WebSearchAgent()
    results = search_agent.run(research_plan)
    summary_report_agent = SummaryReportAgent()
    summary_report = summary_report_agent.run(results)
    
    with open("summary_report.md", "w") as f:
        f.write(summary_report)


if __name__ == "__main__":
    main()