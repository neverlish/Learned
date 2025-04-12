import streamlit as st
import asyncio
import os
from map_reduce_graph import app
from dotenv import load_dotenv
load_dotenv()
os.environ['USER_AGENT'] = "your.email@example.com"

# Assuming all necessary imports and function definitions are present

# Streamlit app
st.title("Company Analysis Report Generator")

# Input for company name
company = st.text_input("Enter company name:")

async def run_graph(company):
    # Create the graph
    # ... (graph creation code here)

    progress_bar = st.progress(0)
    status_text = st.empty()
    step = 0
    total_steps = 4  # Adjust based on the number of main steps in your graph

    # Create tabs for intermediate results
    tab1, tab2, tab3 = st.tabs(["Financial Analysis", "Stock Performance Analysis", "Market Position Analysis"])

    try:
        async for output in app.astream({"company": company},{"recursion_limit":100}):
            for key, value in output.items():
                status_text.text(f"Processing: {key}")
                if key == "financial_analyst":
                    with tab1:
                        st.write(value['analyses'][0]['content'])
                elif key == "stock_analyst":
                    with tab2:
                        st.write(value['analyses'][0]['content'])
                elif key == "market_analyst":
                    with tab3:
                        st.write(value['analyses'][0]['content'])
                elif key == "combine":
                    report = value['combined_report'].content
                
            step += 1
            progress_bar.progress(step / total_steps)
        
        status_text.text("Analysis completed!")
        st.markdown(report)
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        status_text.text("Analysis failed.")
        import traceback
        st.text(traceback.format_exc())

if st.button("Generate Analysis Report"):
    if company:
        st.write(f"Generating analysis report for {company}...")
        asyncio.run(run_graph(company))
    else:
        st.warning("Please enter a company name.")