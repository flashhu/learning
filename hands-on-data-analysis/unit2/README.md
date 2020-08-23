### Task02

#### 1. 查看缺失值个数

`df.isnull().sum()`  直接得缺失个数

`df.info()` 知非空数量

#### 2. 查看某列数据

`df[['Age', 'Cabin', 'Embarked']]`

`df.loc[:,['Age', 'Cabin', 'Embarked']]`

`df.iloc[: ,[5, -2, -1]]`

#### 3. 查看某行

>  注意两者区别
>
> loc，头尾都包含；iloc，头包含

`df.loc[2:3]`  输出2行

`df.iloc[2:3]  `  输出1行

#### 4. 处理缺失值

**法一：丢弃缺失值**

使用[DataFrame.dropna**(**axis=0**,** *how='any'***,** *thresh=None***,** *subset=None***,** *inplace=False***)**](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html)

> axis：默认0，0行；1列。删除行/列当含缺失值
>
> how：默认`any`，`any`任一缺失则弃；`all`所有缺失则弃
>
> thresh：至少几个非空则保留
>
> subset：只看某几个索引是否为空
>
> inplace：默认False，如为True，表示删除操作直接作用原数据

**法二：填充缺失值**

使用[DataFrame.fillna**(**value=None**,** *method=None***,** *axis=None***,** *inplace=False***,** *limit=None***,** *downcast=None***)**](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.fillna.html)

> value：可通过字典等方式设置某个字段对应的填充值
>
> method：默认`None`，`pad`或`ffill`表示用前一个有效值填充；`bfill`或`backfill`反之
>
> limit：填充的最大数量（行/列）

**法三：替换缺失值**

使用[DataFrame.replace(to_replace=None, *value=None***,** *inplace=False***,** *limit=None***,** *regex=False***,** *method='pad'***)**](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.replace.html)

例，`s.replace({"Age": 40}, np.nan)`，将原有数据中的Age列为40的值置为NaN

#### 5. 处理重复值

**法一：去重**

使用[DataFrame.drop_duplicates**(**subset=None**,** *keep='first'***,** *inplace=False***,** *ignore_index=False***)**](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop_duplicates.html)

> subset：只去重特定列
>
> keep：默认`first`，保留前者；`last`，保留后者；`False`，都去除

#### 6. 特征观察处理

* 数值型特征
  * 离散型数值特征
  * 连续型数值特征 => 离散化

* 文本型特征 => 转换成数值型特征
  * 类别型文本特征

#### 7. 对连续型数值特征离散化

**情况一：平均分**

例，`df['AgeBand'] = pd.cut(df['Age'], 5,labels = ['1','2','3','4','5'])`

**情况二：分段**

例，`df['AgeBand'] = pd.cut(df['Age'], [0,5,15,30,50,80],labels = ['1','2','3','4','5'])`

> 每段为前闭后开，如[0,5)

#### 8. 文本型特征转换成数值型特征

**法一：replace**

例，`df['Sex_num'] = df['Sex'].replace(['male', 'female'], [1, 2])`

**法二：map**

例，`df['Sex_num'] = df['Sex'].map({'male': 1, 'female': 2})`

**法三：sklearn.preprocessing 的 LabelEncoder**

**法四：one-hot编码**

> 数据变稀疏，训练时不受分类值大小影响

### Task03

#### 1. 合并数据

**情况一：左右合并**

① [`pandas.concat`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.concat.html)

例，`pd.concat([df_1eft_up, df_right_up], axis=1)`

不设`axis=1`，默认竖向的合并，上半部分接下半部分

② [`DataFrame.join`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.join.html)

例，`df_1eft_up.join(df_right_up)`

③ [`pandas.merge`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.merge.html)

例，`pd.merge(df_1eft_up, df_right_up, left_index=True, right_index=True)`

`left_index`，`right_index` 默认 False, 用于设置是否设左/右侧 DataFrame 的索引为连接键

**情况二：上下合并**

① [`pandas.concat`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.concat.html)

例，`pd.concat([result_up, result_down], ignore_index=True)`

不设`ignore_index=True`，默认不修改原有索引

② [`DataFrame.append`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.append.html)

例，`result_up_m.append(result_down_m, ignore_index=True)`

#### 2. `pandas.merge`，`DataFrame.join`，`pandas.concat`异同

**同: **用于合并

**异: **

* `pandas.concat`沿特定轴（axis）连接，可以合并两个方向；
*  `pandas.merge`，`DataFrame.join`沿列或列索引（columns or indexs）连接，只能合左右方向
* `pandas.merge` 默认使用列的交集连接

* `DataFrame.join` 默认使用 index-on-index 连接



[**GroupBy**](https://pandas.pydata.org/pandas-docs/stable/reference/groupby.html)

* `df.groupby('key1')['data1']` 等价 `df['data1'].groupby(df['key1'])`，前者是后者的语法糖





