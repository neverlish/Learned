from pyspark import SparkContext
from pyspark.sql import SparkSession

def load_data_from_in_memory(sc: SparkContext):
    # [user_id, name]
    user_names = [
        (1, "Andrew"),
        (2, "Chris"),
        (3, "John"),
        (4, "Bob"),
        (6, "Ryan"),
        (7, "Mali"),
        (8, "Tony"),
    ]

    # [user_id, visits]
    user_visits = [
        (1, 10),
        (2, 27),
        (3, 2),
        (4, 5),
        (5, 88),
        (6, 1),
        (7, 5)
    ]


    return sc.parallelize(user_names), sc.parallelize(user_visits)

if __name__ == '__main__':
    ss: SparkSession = SparkSession.builder \
        .master("local") \
        .appName("rdd join ex") \
        .getOrCreate()
    sc: SparkContext = ss.sparkContext

    user_names_rdd, user_visits_rdd = load_data_from_in_memory(sc)

    # user_names_rdd.foreach(print)
    # user_visits_rdd.foreach(print)

    # a) Chris의 방문 횟수를 출력
    joined_rdd = user_names_rdd.join(user_visits_rdd).sortByKey()
    result = joined_rdd.filter(lambda row: row[1][0] == 'Chris').collect()
    # print(result)

    # b) inner join, left outer join, right outer join, full outer join.
    inner = user_names_rdd.join(user_visits_rdd).sortByKey().collect()
    left_outer = user_names_rdd.leftOuterJoin(user_visits_rdd).sortByKey().collect()
    right_outer = user_names_rdd.rightOuterJoin(user_visits_rdd).sortByKey().collect()
    full_outer = user_names_rdd.fullOuterJoin(user_visits_rdd).sortByKey().collect()

    # while True:
    #     pass
