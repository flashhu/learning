### 思考题

#### 1. read_csv() 与 read_table() 的不同

两者同为加载带分隔符的数据

`pandas.read_csv`的分隔符为[`,`](https://github.com/pandas-dev/pandas/blob/master/pandas/io/parsers.py#L543)    `pandas.read_table`的分隔符为[`\t`](https://github.com/pandas-dev/pandas/blob/master/pandas/io/parsers.py#L701)

体现为将表中数据取出后，`pandas.read_csv`为每格一列，`pandas.read_table`为每行一列

`pandas.read_table('train.csv', sep=',')`可通过设置分隔符，达到与`pandas.read_csv`一样的效果

#### 2. `.tsv`与`.csv`的不同及加载方式

`tsv`是`csv`的一种变体，每条记录的各字段间以制表符分隔

`tsv` => `pandas.read_csv('train.tsv', sep='\t')`, 设置分隔符

#### 3. 逐块读取的意义

在调用`pandas.read_csv`时使用`chunksize`参数，得到遍历 DataFrames 的迭代器

每个 DataFrame 为下一块的文件内容

这种方式在数据文件很大时，可以只加载一部分到内存，减少内存使用

#### 4. 如何自定义表头

> 当未设置names, header默认0；当设置names，header默认None

情况一：未设置表头

```python
pandas.read_csv('train.csv', names=['', ''..., ''], header=None)
```

情况二：替换原有表头

① 读数时替换表头

```python
pandas.read_csv('train.csv', names=['', ''..., ''], header=0)
```

② 读完后设置表头

```python
df = pd.read_csv('train.csv')
df.columns = ['', ''..., '']
```

#### 5. DataFrame 常用API — 查看信息

| API                                                          | 作用           | 示例结果                                 |
| ------------------------------------------------------------ | -------------- | ---------------------------------------- |
| pandas.DataFrame.columns                                     | 所有列标签     | Index([ ' ', ' ' , ... ],dtype='object') |
| pandas.DataFrame.index                                       | 所有行标签     | RangeIndex(start=0, stop=891, step=1)    |
| pandas.DataFrame.shape                                       | 行数，列数     | (891, 12)                                |
| [pandas.DataFrame.to_numpy()](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_numpy.html#pandas.DataFrame.to_numpy) | 转为NumPy 数组 | array([[1. , 3. ], [2. , 4.5]])          |

查看某一列( name )的信息：`df.name` 或 `df['name']`

#### 6. 删除某列的方式

情况一：不变原 DataFrame, 生成新的

drop =>  如，`df.drop('a', axis=1)`，设置`axis=1`指定列，默认为0，删行; `inplace`默认为 False，操作不对原数据生效

情况二：变原 DataFrame

① del => 如， `del df['a']`

② pop => 如，`df.pop('a')`

③ drop =>  如，`df.drop('a', axis=1, inplace=True)`

### 注意

* 读取，生成包含中文的文件要设置编码`encoding`
* `[[]]`生成 DataFrame；`[]`生成 Series
* `KeyError Traceback (most recent call last)`通常为索引写错名字
* 数据文件的 NAN/NULL 数据读取为 DataFrame 后最终变为 **float**

### API使用

**Pandas**

* [pandas.read_csv](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)
* [pandas.DataFrame.info](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.info.html)
* [pandas.DataFrame.describe](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.describe.html)
* [pandas.DataFrame.loc](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html)  
* [pandas.DataFrame.reset_index](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.reset_index.html)
* [pandas.DataFrame.sort_values](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_values.html)
* [pandas.DataFrame.sort_index](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_index.html)