# gmg-food-assistant
(Tech Stacks Used)
- ReactJS
- PineconeDB
- OpenAI API

## Version-1
- Restaurant uploads menu
- Our model _extracts_ menu items from pdf/png. (Use OCR to scan for characters, if language is Indic we can try use translators).
- Create relational database based off menu items and have it relate items to food that it is trained on (Pinecone DB to use for RAG context usage)
- Fine tune model to make sure exclusively give items from menus provided.

## Model Installation 
```bash
git clone
```
```bash
pip install openai
```

## Frontend Installation
```bash
git clone
```
```bash
npm install --legacy-peer-deps
```
```bash
npm run ios
```

## Contribution Rules
- Any edits made should be on new branch, main is left untouched until someone else tests it.
