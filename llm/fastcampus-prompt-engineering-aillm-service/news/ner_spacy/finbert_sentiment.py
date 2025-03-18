
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-classification", model="ProsusAI/finbert")

print(pipe("Tesla stock dropped 25%, but Meta railed 30%."))
print(pipe("Meta railed 30%, but Tesla stock dropped 25%."))

print(pipe("Meta reported strong financial result for Q1 2024"))
print(pipe("Tesla released its financial results for Q1 2024, missing Wall Street expectations."))

print(pipe("Meta reported strong financial result for Q1 2024, but Tesla released its financial results for Q1 2024, missing Wall Street expectations."))