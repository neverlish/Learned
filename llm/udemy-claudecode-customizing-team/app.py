import streamlit as st
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Page configuration
st.set_page_config(
    page_title="BrezyWeather",
    page_icon="🌤️",
    layout="centered"
)

# Initialize session state
if "city_input" not in st.session_state:
    st.session_state.city_input = ""
if "show_weather" not in st.session_state:
    st.session_state.show_weather = False
if "refresh_trigger" not in st.session_state:
    st.session_state.refresh_trigger = False
if "show_refresh_success" not in st.session_state:
    st.session_state.show_refresh_success = False
if "dark_mode" not in st.session_state:
    st.session_state.dark_mode = False

# Apply dark mode styles based on session state
if st.session_state.dark_mode:
    dark_mode_css = """
    <style>
        /* Main app background */
        .stApp {
            background-color: #1E1E1E !important;
        }

        /* All text elements */
        .stApp, .stMarkdown, .stText, h1, h2, h3, p, label, div {
            color: #E0E0E0 !important;
        }

        /* Main container background */
        .main .block-container {
            background-color: #1E1E1E !important;
        }

        /* Input fields */
        .stTextInput > div > div > input {
            background-color: #2D2D2D !important;
            color: #E0E0E0 !important;
            border-color: #404040 !important;
        }

        /* Regular buttons */
        .stButton > button {
            background-color: #2D2D2D !important;
            color: #E0E0E0 !important;
            border: 1px solid #404040 !important;
        }

        .stButton > button:hover {
            background-color: #3D3D3D !important;
            border-color: #505050 !important;
        }

        /* Primary buttons */
        .stButton > button[kind="primary"] {
            background-color: #FF6B6B !important;
            color: #FFFFFF !important;
            border: 1px solid #FF6B6B !important;
        }

        .stButton > button[kind="primary"]:hover {
            background-color: #FF5252 !important;
        }

        /* Success messages */
        .stSuccess {
            background-color: #1E4620 !important;
            color: #90EE90 !important;
        }

        /* Warning messages */
        .stWarning {
            background-color: #4A3C1E !important;
            color: #FFD700 !important;
        }

        /* Error messages */
        .stAlert {
            background-color: #4A1E1E !important;
            color: #FF6B6B !important;
        }

        /* Horizontal rules */
        hr {
            border-color: #404040 !important;
        }

        /* Spinner */
        .stSpinner > div {
            border-top-color: #FF6B6B !important;
        }

        /* Toggle button container */
        div[data-testid="column"]:has(button[key="theme_toggle"]) {
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
        }
    </style>
    """
else:
    dark_mode_css = """
    <style>
        /* Light mode - keep default Streamlit styling */
        .stApp {
            background-color: #FFFFFF !important;
        }

        /* Toggle button container */
        div[data-testid="column"]:has(button[key="theme_toggle"]) {
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
        }
    </style>
    """

st.markdown(dark_mode_css, unsafe_allow_html=True)

# Dark mode toggle button in top right
col_left, col_right = st.columns([5, 1])
with col_right:
    if st.button("🌙" if not st.session_state.dark_mode else "☀️", key="theme_toggle", help="Toggle dark/light mode"):
        st.session_state.dark_mode = not st.session_state.dark_mode
        st.rerun()

# App title and description
st.title("🌤️ BrezyWeather")
st.markdown("Get current weather information for any city using AI")

# City input (value is controlled by refresh_trigger)
city = st.text_input(
    "Enter a city name:",
    placeholder="e.g., New York, London, Tokyo",
    value="" if st.session_state.refresh_trigger else st.session_state.get("city_input", "")
)

# Buttons (side-by-side compact layout)
col1, col2, col3 = st.columns([1, 1, 3])

with col1:
    get_weather_clicked = st.button("Get Weather", type="primary")

with col2:
    refresh_clicked = st.button("Refresh")

# Handle Refresh button
if refresh_clicked:
    st.session_state.show_weather = False
    st.session_state.refresh_trigger = True
    st.session_state.show_refresh_success = True
    st.rerun()

# Reset refresh trigger after it's been used
if st.session_state.refresh_trigger:
    st.session_state.refresh_trigger = False

# Display refresh success message
if st.session_state.show_refresh_success:
    st.success("✓ Weather data cleared and refreshed!")
    st.session_state.show_refresh_success = False

# Handle Get Weather button
if get_weather_clicked:
    if city:
        with st.spinner(f"Fetching weather for {city}..."):
            try:
                # Create a prompt for OpenAI
                prompt = f"""Please provide the current weather information for {city}.
                Include the following details:
                - Temperature (in Celsius and Fahrenheit)
                - Weather condition (sunny, cloudy, rainy, etc.)
                - Humidity
                - Wind speed
                - General description of the current weather

                Format the response in a clear and friendly way."""

                # Call OpenAI API
                response = openai.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful weather assistant that provides current weather information for cities around the world."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.7,
                    max_tokens=300
                )

                # Extract and display the weather information
                weather_info = response.choices[0].message.content

                # Store weather data in session state
                st.session_state.show_weather = True
                st.session_state.weather_data = {
                    "city": city,
                    "info": weather_info
                }

            except openai.AuthenticationError:
                st.error("❌ Authentication Error: Please check your OpenAI API key in the .env file.")
            except openai.APIError as e:
                st.error(f"❌ OpenAI API Error: {str(e)}")
            except Exception as e:
                st.error(f"❌ An error occurred: {str(e)}")
    else:
        st.warning("⚠️ Please enter a city name.")

# Display weather if available in session state (persists across reruns)
if st.session_state.show_weather and "weather_data" in st.session_state:
    weather_data = st.session_state.weather_data
    st.success(f"Weather for {weather_data['city']}")
    st.markdown("---")
    st.markdown(weather_data["info"])

# Footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: gray; font-size: 0.9em;'>
        <p>Powered by OpenAI and Streamlit</p>
    </div>
    """,
    unsafe_allow_html=True
)
