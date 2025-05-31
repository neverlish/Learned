// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'todo_db_model.dart';

// **************************************************************************
// IsarCollectionGenerator
// **************************************************************************

// coverage:ignore-file
// ignore_for_file: duplicate_ignore, non_constant_identifier_names, constant_identifier_names, invalid_use_of_protected_member, unnecessary_cast, prefer_const_constructors, lines_longer_than_80_chars, require_trailing_commas, inference_failure_on_function_invocation, unnecessary_parenthesis, unnecessary_raw_strings, unnecessary_null_checks, join_return_with_assignment, prefer_final_locals, avoid_js_rounded_ints, avoid_positional_boolean_parameters, always_specify_types

extension GetTodoDbModelCollection on Isar {
  IsarCollection<TodoDbModel> get todoDbModels => this.collection();
}

const TodoDbModelSchema = CollectionSchema(
  name: r'TodoDbModel',
  id: 1356027354491722719,
  properties: {
    r'createdTime': PropertySchema(
      id: 0,
      name: r'createdTime',
      type: IsarType.dateTime,
    ),
    r'dueDate': PropertySchema(
      id: 1,
      name: r'dueDate',
      type: IsarType.dateTime,
    ),
    r'modifyTime': PropertySchema(
      id: 2,
      name: r'modifyTime',
      type: IsarType.dateTime,
    ),
    r'status': PropertySchema(
      id: 3,
      name: r'status',
      type: IsarType.byte,
      enumMap: _TodoDbModelstatusEnumValueMap,
    ),
    r'title': PropertySchema(
      id: 4,
      name: r'title',
      type: IsarType.string,
    )
  },
  estimateSize: _todoDbModelEstimateSize,
  serialize: _todoDbModelSerialize,
  deserialize: _todoDbModelDeserialize,
  deserializeProp: _todoDbModelDeserializeProp,
  idName: r'id',
  indexes: {
    r'createdTime': IndexSchema(
      id: 8163241038237961676,
      name: r'createdTime',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'createdTime',
          type: IndexType.value,
          caseSensitive: false,
        )
      ],
    ),
    r'modifyTime': IndexSchema(
      id: -6190835634963155262,
      name: r'modifyTime',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'modifyTime',
          type: IndexType.value,
          caseSensitive: false,
        )
      ],
    ),
    r'title': IndexSchema(
      id: -7636685945352118059,
      name: r'title',
      unique: false,
      replace: false,
      properties: [
        IndexPropertySchema(
          name: r'title',
          type: IndexType.value,
          caseSensitive: true,
        )
      ],
    )
  },
  links: {},
  embeddedSchemas: {},
  getId: _todoDbModelGetId,
  getLinks: _todoDbModelGetLinks,
  attach: _todoDbModelAttach,
  version: '3.1.0',
);

int _todoDbModelEstimateSize(
  TodoDbModel object,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  var bytesCount = offsets.last;
  bytesCount += 3 + object.title.length * 3;
  return bytesCount;
}

void _todoDbModelSerialize(
  TodoDbModel object,
  IsarWriter writer,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  writer.writeDateTime(offsets[0], object.createdTime);
  writer.writeDateTime(offsets[1], object.dueDate);
  writer.writeDateTime(offsets[2], object.modifyTime);
  writer.writeByte(offsets[3], object.status.index);
  writer.writeString(offsets[4], object.title);
}

TodoDbModel _todoDbModelDeserialize(
  Id id,
  IsarReader reader,
  List<int> offsets,
  Map<Type, List<int>> allOffsets,
) {
  final object = TodoDbModel(
    id,
    reader.readDateTimeOrNull(offsets[0]),
    reader.readDateTimeOrNull(offsets[2]),
    reader.readString(offsets[4]),
    reader.readDateTime(offsets[1]),
    _TodoDbModelstatusValueEnumMap[reader.readByteOrNull(offsets[3])] ??
        TodoStatus.incomplete,
  );
  return object;
}

P _todoDbModelDeserializeProp<P>(
  IsarReader reader,
  int propertyId,
  int offset,
  Map<Type, List<int>> allOffsets,
) {
  switch (propertyId) {
    case 0:
      return (reader.readDateTimeOrNull(offset)) as P;
    case 1:
      return (reader.readDateTime(offset)) as P;
    case 2:
      return (reader.readDateTimeOrNull(offset)) as P;
    case 3:
      return (_TodoDbModelstatusValueEnumMap[reader.readByteOrNull(offset)] ??
          TodoStatus.incomplete) as P;
    case 4:
      return (reader.readString(offset)) as P;
    default:
      throw IsarError('Unknown property with id $propertyId');
  }
}

const _TodoDbModelstatusEnumValueMap = {
  'incomplete': 0,
  'ongoing': 1,
  'complete': 2,
};
const _TodoDbModelstatusValueEnumMap = {
  0: TodoStatus.incomplete,
  1: TodoStatus.ongoing,
  2: TodoStatus.complete,
};

Id _todoDbModelGetId(TodoDbModel object) {
  return object.id;
}

List<IsarLinkBase<dynamic>> _todoDbModelGetLinks(TodoDbModel object) {
  return [];
}

void _todoDbModelAttach(
    IsarCollection<dynamic> col, Id id, TodoDbModel object) {
  object.id = id;
}

extension TodoDbModelQueryWhereSort
    on QueryBuilder<TodoDbModel, TodoDbModel, QWhere> {
  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhere> anyId() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(const IdWhereClause.any());
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhere> anyCreatedTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'createdTime'),
      );
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhere> anyModifyTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'modifyTime'),
      );
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhere> anyTitle() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        const IndexWhereClause.any(indexName: r'title'),
      );
    });
  }
}

extension TodoDbModelQueryWhere
    on QueryBuilder<TodoDbModel, TodoDbModel, QWhereClause> {
  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> idEqualTo(Id id) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: id,
        upper: id,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> idNotEqualTo(
      Id id) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(
              IdWhereClause.lessThan(upper: id, includeUpper: false),
            )
            .addWhereClause(
              IdWhereClause.greaterThan(lower: id, includeLower: false),
            );
      } else {
        return query
            .addWhereClause(
              IdWhereClause.greaterThan(lower: id, includeLower: false),
            )
            .addWhereClause(
              IdWhereClause.lessThan(upper: id, includeUpper: false),
            );
      }
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> idGreaterThan(Id id,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.greaterThan(lower: id, includeLower: include),
      );
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> idLessThan(Id id,
      {bool include = false}) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(
        IdWhereClause.lessThan(upper: id, includeUpper: include),
      );
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> idBetween(
    Id lowerId,
    Id upperId, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IdWhereClause.between(
        lower: lowerId,
        includeLower: includeLower,
        upper: upperId,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      createdTimeIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'createdTime',
        value: [null],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      createdTimeIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'createdTime',
        lower: [null],
        includeLower: false,
        upper: [],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> createdTimeEqualTo(
      DateTime? createdTime) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'createdTime',
        value: [createdTime],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      createdTimeNotEqualTo(DateTime? createdTime) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'createdTime',
              lower: [],
              upper: [createdTime],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'createdTime',
              lower: [createdTime],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'createdTime',
              lower: [createdTime],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'createdTime',
              lower: [],
              upper: [createdTime],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      createdTimeGreaterThan(
    DateTime? createdTime, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'createdTime',
        lower: [createdTime],
        includeLower: include,
        upper: [],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> createdTimeLessThan(
    DateTime? createdTime, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'createdTime',
        lower: [],
        upper: [createdTime],
        includeUpper: include,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> createdTimeBetween(
    DateTime? lowerCreatedTime,
    DateTime? upperCreatedTime, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'createdTime',
        lower: [lowerCreatedTime],
        includeLower: includeLower,
        upper: [upperCreatedTime],
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> modifyTimeIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'modifyTime',
        value: [null],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      modifyTimeIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'modifyTime',
        lower: [null],
        includeLower: false,
        upper: [],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> modifyTimeEqualTo(
      DateTime? modifyTime) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'modifyTime',
        value: [modifyTime],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      modifyTimeNotEqualTo(DateTime? modifyTime) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'modifyTime',
              lower: [],
              upper: [modifyTime],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'modifyTime',
              lower: [modifyTime],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'modifyTime',
              lower: [modifyTime],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'modifyTime',
              lower: [],
              upper: [modifyTime],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause>
      modifyTimeGreaterThan(
    DateTime? modifyTime, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'modifyTime',
        lower: [modifyTime],
        includeLower: include,
        upper: [],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> modifyTimeLessThan(
    DateTime? modifyTime, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'modifyTime',
        lower: [],
        upper: [modifyTime],
        includeUpper: include,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> modifyTimeBetween(
    DateTime? lowerModifyTime,
    DateTime? upperModifyTime, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'modifyTime',
        lower: [lowerModifyTime],
        includeLower: includeLower,
        upper: [upperModifyTime],
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleEqualTo(
      String title) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'title',
        value: [title],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleNotEqualTo(
      String title) {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'title',
              lower: [],
              upper: [title],
              includeUpper: false,
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'title',
              lower: [title],
              includeLower: false,
              upper: [],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.between(
              indexName: r'title',
              lower: [title],
              includeLower: false,
              upper: [],
            ))
            .addWhereClause(IndexWhereClause.between(
              indexName: r'title',
              lower: [],
              upper: [title],
              includeUpper: false,
            ));
      }
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleGreaterThan(
    String title, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'title',
        lower: [title],
        includeLower: include,
        upper: [],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleLessThan(
    String title, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'title',
        lower: [],
        upper: [title],
        includeUpper: include,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleBetween(
    String lowerTitle,
    String upperTitle, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'title',
        lower: [lowerTitle],
        includeLower: includeLower,
        upper: [upperTitle],
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleStartsWith(
      String TitlePrefix) {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.between(
        indexName: r'title',
        lower: [TitlePrefix],
        upper: ['$TitlePrefix\u{FFFFF}'],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addWhereClause(IndexWhereClause.equalTo(
        indexName: r'title',
        value: [''],
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterWhereClause> titleIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      if (query.whereSort == Sort.asc) {
        return query
            .addWhereClause(IndexWhereClause.lessThan(
              indexName: r'title',
              upper: [''],
            ))
            .addWhereClause(IndexWhereClause.greaterThan(
              indexName: r'title',
              lower: [''],
            ));
      } else {
        return query
            .addWhereClause(IndexWhereClause.greaterThan(
              indexName: r'title',
              lower: [''],
            ))
            .addWhereClause(IndexWhereClause.lessThan(
              indexName: r'title',
              upper: [''],
            ));
      }
    });
  }
}

extension TodoDbModelQueryFilter
    on QueryBuilder<TodoDbModel, TodoDbModel, QFilterCondition> {
  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNull(
        property: r'createdTime',
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNotNull(
        property: r'createdTime',
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeEqualTo(DateTime? value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'createdTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeGreaterThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'createdTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeLessThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'createdTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      createdTimeBetween(
    DateTime? lower,
    DateTime? upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'createdTime',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> dueDateEqualTo(
      DateTime value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'dueDate',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      dueDateGreaterThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'dueDate',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> dueDateLessThan(
    DateTime value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'dueDate',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> dueDateBetween(
    DateTime lower,
    DateTime upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'dueDate',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> idEqualTo(
      Id value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> idGreaterThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> idLessThan(
    Id value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'id',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> idBetween(
    Id lower,
    Id upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'id',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeIsNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNull(
        property: r'modifyTime',
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeIsNotNull() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(const FilterCondition.isNotNull(
        property: r'modifyTime',
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeEqualTo(DateTime? value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'modifyTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeGreaterThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'modifyTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeLessThan(
    DateTime? value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'modifyTime',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      modifyTimeBetween(
    DateTime? lower,
    DateTime? upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'modifyTime',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> statusEqualTo(
      TodoStatus value) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'status',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      statusGreaterThan(
    TodoStatus value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'status',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> statusLessThan(
    TodoStatus value, {
    bool include = false,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'status',
        value: value,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> statusBetween(
    TodoStatus lower,
    TodoStatus upper, {
    bool includeLower = true,
    bool includeUpper = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'status',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleEqualTo(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      titleGreaterThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        include: include,
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleLessThan(
    String value, {
    bool include = false,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.lessThan(
        include: include,
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleBetween(
    String lower,
    String upper, {
    bool includeLower = true,
    bool includeUpper = true,
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.between(
        property: r'title',
        lower: lower,
        includeLower: includeLower,
        upper: upper,
        includeUpper: includeUpper,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleStartsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.startsWith(
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleEndsWith(
    String value, {
    bool caseSensitive = true,
  }) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.endsWith(
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleContains(
      String value,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.contains(
        property: r'title',
        value: value,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleMatches(
      String pattern,
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.matches(
        property: r'title',
        wildcard: pattern,
        caseSensitive: caseSensitive,
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition> titleIsEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.equalTo(
        property: r'title',
        value: '',
      ));
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterFilterCondition>
      titleIsNotEmpty() {
    return QueryBuilder.apply(this, (query) {
      return query.addFilterCondition(FilterCondition.greaterThan(
        property: r'title',
        value: '',
      ));
    });
  }
}

extension TodoDbModelQueryObject
    on QueryBuilder<TodoDbModel, TodoDbModel, QFilterCondition> {}

extension TodoDbModelQueryLinks
    on QueryBuilder<TodoDbModel, TodoDbModel, QFilterCondition> {}

extension TodoDbModelQuerySortBy
    on QueryBuilder<TodoDbModel, TodoDbModel, QSortBy> {
  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByCreatedTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdTime', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByCreatedTimeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdTime', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByDueDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'dueDate', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByDueDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'dueDate', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByModifyTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'modifyTime', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByModifyTimeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'modifyTime', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByStatus() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'status', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByStatusDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'status', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByTitle() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'title', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> sortByTitleDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'title', Sort.desc);
    });
  }
}

extension TodoDbModelQuerySortThenBy
    on QueryBuilder<TodoDbModel, TodoDbModel, QSortThenBy> {
  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByCreatedTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdTime', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByCreatedTimeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'createdTime', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByDueDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'dueDate', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByDueDateDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'dueDate', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenById() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'id', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByIdDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'id', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByModifyTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'modifyTime', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByModifyTimeDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'modifyTime', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByStatus() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'status', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByStatusDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'status', Sort.desc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByTitle() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'title', Sort.asc);
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QAfterSortBy> thenByTitleDesc() {
    return QueryBuilder.apply(this, (query) {
      return query.addSortBy(r'title', Sort.desc);
    });
  }
}

extension TodoDbModelQueryWhereDistinct
    on QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> {
  QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> distinctByCreatedTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'createdTime');
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> distinctByDueDate() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'dueDate');
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> distinctByModifyTime() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'modifyTime');
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> distinctByStatus() {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'status');
    });
  }

  QueryBuilder<TodoDbModel, TodoDbModel, QDistinct> distinctByTitle(
      {bool caseSensitive = true}) {
    return QueryBuilder.apply(this, (query) {
      return query.addDistinctBy(r'title', caseSensitive: caseSensitive);
    });
  }
}

extension TodoDbModelQueryProperty
    on QueryBuilder<TodoDbModel, TodoDbModel, QQueryProperty> {
  QueryBuilder<TodoDbModel, int, QQueryOperations> idProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'id');
    });
  }

  QueryBuilder<TodoDbModel, DateTime?, QQueryOperations> createdTimeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'createdTime');
    });
  }

  QueryBuilder<TodoDbModel, DateTime, QQueryOperations> dueDateProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'dueDate');
    });
  }

  QueryBuilder<TodoDbModel, DateTime?, QQueryOperations> modifyTimeProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'modifyTime');
    });
  }

  QueryBuilder<TodoDbModel, TodoStatus, QQueryOperations> statusProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'status');
    });
  }

  QueryBuilder<TodoDbModel, String, QQueryOperations> titleProperty() {
    return QueryBuilder.apply(this, (query) {
      return query.addPropertyName(r'title');
    });
  }
}
