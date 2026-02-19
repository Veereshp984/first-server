import matplotlib.pyplot as plt
import networkx as nx 
import pandas as pd
data = pd.read_csv('./9csv.csv')
G = nx.from_pandas_edgelist(data,'source','target',create_using=nx.DiGraph())
print('Degree :',nx.degree_centrality(G))
print('closeness: ',nx.closeness_centrality(G))
print('betweenness: ',nx.betweenness_centrality(G))
nx.draw(G, with_labels=True , node_color='lightblue', arrows= True)
plt.show()