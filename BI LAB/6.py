import pandas as pd
from mlxtend.frequent_patterns import apriori,association_rules

data = pd.read_csv('./6csv.csv')
basket = data.groupby(['TransactionID','Item'])['Item'].count().unstack().fillna(0)
basket = basket.applymap(lambda x :1 if x > 0 else 0)
rules = association_rules(
    apriori(basket , min_support =0.2, use_colnames = True),
    metric = 'lift', min_threshold = 1
)

print(rules[['antecedents','consequents','support','confidence']])