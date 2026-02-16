Debug an issue in the BrezyWeather Streamlit application.

Problem Description: $ARGUMENTS

## Investigation Steps

First, read and analyze `app.py` to understand the current implementation.

Identify which area(s) of the app are affected:

### 1. Session State (Lines 19-29, 163-176)
Common issues:
- Session state variable not initialized before use
- Missing default value check with `if "key" not in st.session_state`
- State not being updated after user action
- State leaking between different UI flows

### 2. OpenAI API Integration (Lines 182-220)
Common issues:
- Missing or invalid `OPENAI_API_KEY` in `.env` file
- API rate limiting or quota exceeded
- Incorrect model name (should be "gpt-3.5-turbo")
- Response parsing error (`response.choices[0].message.content`)
- Missing error handling for `AuthenticationError` or `APIError`

### 3. UI Components (Lines 136-161, 222-240)
Common issues:
- Missing `st.rerun()` after state change that should update UI
- Incorrect column ratios in `st.columns()`
- Button click not being captured (check variable assignment)
- Input field value not synced with session state
- Widget key conflicts

### 4. Theme/Dark Mode (Lines 31-140)
Common issues:
- CSS selectors not targeting correct Streamlit classes
- Missing `!important` flag on CSS properties
- `st.markdown()` not using `unsafe_allow_html=True`
- Theme toggle not calling `st.rerun()` after state change
- CSS not scoped properly (affecting unintended elements)

## Output Format

Provide a structured analysis with:

### Root Cause Analysis
- Identify the specific issue causing the problem
- Explain why this causes the observed behavior

### Affected Code
- List the exact line numbers in `app.py`
- Show the problematic code snippet

### Suggested Fix
- Provide the corrected code
- Explain what changed and why

### Verification Steps
1. Steps to reproduce the original issue
2. Steps to verify the fix works
3. Edge cases to test

## Additional Checks

- Verify session state initialization order
- Check for proper error handling
- Ensure UI updates correctly after state changes
- Confirm dark/light mode CSS applies correctly
- Test refresh functionality clears state properly
