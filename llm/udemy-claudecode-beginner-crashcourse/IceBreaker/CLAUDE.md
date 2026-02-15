# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

**Development:**
```bash
# Install dependencies
pipenv install

# Run the Flask application
pipenv run app.py
```

**Testing:**
```bash
# Run test suite
pipenv run pytest .
```

**Code Quality:**
```bash
# Format code
pipenv run black .

# Sort imports
pipenv run isort .

# Lint code
pipenv run pylint
```

## Architecture Overview

Ice Breaker is a LangChain-powered AI application that generates personalized conversation starters from LinkedIn and Twitter profiles. The application uses a multi-stage pipeline orchestrated through Flask.

### Pipeline Flow

1. **User Input** → Flask `/process` endpoint receives a name
2. **Profile Discovery** → Agents search for LinkedIn URL and Twitter username using Tavily
3. **Data Extraction** → Scrapers collect profile data (mocked by default in `ice_breaker.py`)
4. **AI Analysis** → Three parallel LangChain chains generate:
   - Summary + facts (via `get_summary_chain`)
   - Topics of interest (via `get_interests_chain`)
   - Ice breakers (via `get_ice_breaker_chain`)
5. **Response** → Structured JSON returned to frontend

### Key Components

| Module | Purpose |
|--------|---------|
| `app.py` | Flask entry point; serves `index.html` and handles `/process` POST endpoint |
| `ice_breaker.py` | Core orchestrator; coordinates agents, scrapers, and chains |
| `agents/` | LangChain ReAct agents that use Tavily search to find profile URLs |
| `chains/custom_chains.py` | LangChain LCEL chains with Pydantic output parsers |
| `third_parties/` | External API integrations (Scrapin.io for LinkedIn, tweepy for Twitter) |
| `tools/tools.py` | Tavily search wrapper used by agents |
| `output_parsers.py` | Pydantic models (`Summary`, `TopicOfInterest`, `IceBreaker`) and parsers |

### Agent Pattern

Both `linkedin_lookup_agent.py` and `twitter_lookup_agent.py` follow the same pattern:
- Use `ChatOpenAI` with `gpt-4o-mini` at temperature 0
- Create ReAct agents via `create_react_agent` with the `hwchase17/react` prompt from LangChain hub
- Single tool: `get_profile_url_tavily` from `tools/tools.py`
- Return extracted URL or username as string

### Chain Pattern

Chains in `custom_chains.py` are LCEL sequences:
```
PromptTemplate | ChatOpenAI | PydanticOutputParser
```

Each chain receives `linkedin_data` (dict) and `tweets` (list of dicts) as input, and outputs a structured Pydantic model.

### Data Sources

**LinkedIn:** `scrape_linkedin_profile` accepts a `mock=False` parameter to use real Scrapin.io API instead of hardcoded Gist.

**Twitter:** `ice_breaker.py:25` calls `scrape_user_tweets_mock` by default. To use real Twitter API, switch to `scrape_user_tweets` and ensure `TWITTER_*` env vars are set.

### Environment Variables

Required:
- `OPENAI_API_KEY` - GPT models for agents and chains
- `SCRAPIN_API_KEY` - LinkedIn scraping
- `TAVILY_API_KEY` - Profile URL search

Optional (for Twitter integration):
- `TWITTER_BEARER_TOKEN`, `TWITTER_API_KEY`, `TWITTER_API_KEY_SECRET`
- `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`

Optional (LangSmith tracing):
- `LANGCHAIN_TRACING_V2=true` requires `LANGCHAIN_API_KEY`
