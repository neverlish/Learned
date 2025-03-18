import spacy

nlp = spacy.load('en_core_web_sm')

document = '''Mark Zuckerberg laid out Meta's gameplan for "playing to win" against Alphabet and Microsoft in the high-stakes AI arms race. Meta's secret weapon: its walled garden of data.'''

doc = nlp(document)

for e in doc:
  if e.ent_type_ != "":
    print(f"{e} | {e.ent_type_}")