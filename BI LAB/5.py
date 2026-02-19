import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


data = pd.read_csv("./5csv.csv")
x = data[['age','income']]


Kmeans = KMeans(n_clusters=2, random_state=0)
data['cluster'] = Kmeans.fit_predict(x)
print(data)
plt.scatter(x['age'],x['income'],c=data['cluster'],cmap='rainbow')
plt.xlabel('age')
plt.ylabel('income')
plt.title('customer cluters')
plt.show()