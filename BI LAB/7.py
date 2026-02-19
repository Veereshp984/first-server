import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB

data = pd.read_csv("7.csv")

data = data.dropna(subset=['text', 'label'])
data['label'] = data['label'].astype(str).str.lower().str.strip()

X = CountVectorizer().fit_transform(data['text'])
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=0, stratify=y
)

model = MultinomialNB()
model.fit(X_train, y_train)

print("Accuracy:", model.score(X_test, y_test))
