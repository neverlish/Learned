# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrezyWeather is a Streamlit-based weather application that uses OpenAI's API to generate weather information for cities. It's a single-page application with dark mode support and session state management.

## Directory Structure

```
brezy-weather/
├── app.py              # Main Streamlit application with dark mode and session state
├── requirements.txt    # Python dependencies
├── .env               # Environment variables (API keys)
├── .streamlit/        # Streamlit configuration directory
├── .venv/             # Virtual environment
└── README.md          # This file
```

## Development Commands

### Setup and Running
```bash
# Activate virtual environment
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run the application
streamlit run app.py
```

The app runs on `http://localhost:8501` by default.

### Environment Configuration
- The `.env` file must contain `OPENAI_API_KEY` for the app to function
- Never commit the `.env` file (it contains secrets)

## Architecture

### Session State Management
The application uses Streamlit's session state to persist data across reruns:
- `city_input`: Stores the entered city name
- `show_weather`: Boolean flag to control weather display
- `weather_data`: Stores fetched weather information (city and info)
- `refresh_trigger`: Boolean flag to clear input field on refresh
- `show_refresh_success`: Boolean flag to show refresh success message
- `dark_mode`: Boolean flag for theme toggle

### Theme System
The app implements a custom dark mode using CSS injection via `st.markdown()`:
- Theme state stored in `st.session_state.dark_mode`
- CSS is conditionally applied based on the theme state
- Toggle button in top-right corner (🌙/☀️) triggers `st.rerun()` to apply changes

### OpenAI Integration
- Uses `openai.chat.completions.create()` with GPT-3.5-turbo model
- API key loaded from environment variables via `python-dotenv`
- Error handling includes specific cases for `AuthenticationError` and `APIError`
- Weather prompts are structured to request specific data points (temperature, humidity, wind speed, etc.)

### UI Flow
1. User enters city name → clicks "Get Weather" button
2. Spinner shows during API call
3. Weather data stored in session state and displayed
4. "Refresh" button clears session state and resets input field
5. Dark mode toggle triggers full page rerun with new CSS

## Key Implementation Details

- **Rerun behavior**: The app uses `st.rerun()` for theme changes and refresh functionality
- **Button state**: Two-column button layout with "Get Weather" (primary) and "Refresh" (secondary)
- **CSS scoping**: Dark mode styles target specific Streamlit classes and test IDs
- **Error messages**: User-friendly error messages with emoji indicators (❌, ⚠️, ✓)

## Team Coding Standards

- Follow PEP 8. Use 4 spaces, max line 100. `snake_case` for variables/functions, `UPPER_CASE` for constants.
- Initialize all session state at the top. Use `st.session_state` for persistent data.
- Use `st.rerun()` (not deprecated methods).
- Group UI with `st.columns()` or `st.container()`.
- Imports: standard, third-party, then local. Constants after imports.
- Helper functions before main UI code.
- Docstrings for functions; inline comments only for tricky logic.
- Keep README.md current.

## Code Review Checklist

1. Feature works, no regressions, errors handled.
2. Code follows standards, no hardcoded values/duplication.
3. All session state has defaults, updates UI, no leaks.
4. UI/logic works in light & dark mode; CSS scoped.
5. No secrets in code; user inputs validated; safe error messages.