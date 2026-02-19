import pandas as pd
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer

data = pd.read_csv("./8csv.csv")

docs = data['article'].astype(str)

vectorizer = CountVectorizer(stop_words='english')
X = vectorizer.fit_transform(docs)

lda = LatentDirichletAllocation(n_components=2, random_state=0)
lda.fit(X)

terms = vectorizer.get_feature_names_out()

for i, topic in enumerate(lda.components_):
    print("Topic", i, ":", [terms[j] for j in topic.argsort()[-5:]])
