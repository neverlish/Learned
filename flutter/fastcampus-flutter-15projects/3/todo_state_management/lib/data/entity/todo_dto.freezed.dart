// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'todo_dto.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

TodoDTO _$TodoDTOFromJson(Map<String, dynamic> json) {
  return _TodoDTO.fromJson(json);
}

/// @nodoc
mixin _$TodoDTO {
  int get id => throw _privateConstructorUsedError;
  set id(int value) => throw _privateConstructorUsedError;
  DateTime get createdTime => throw _privateConstructorUsedError;
  set createdTime(DateTime value) => throw _privateConstructorUsedError;
  DateTime? get modifyTime => throw _privateConstructorUsedError;
  set modifyTime(DateTime? value) => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  set title(String value) => throw _privateConstructorUsedError;
  DateTime get dueDate => throw _privateConstructorUsedError;
  set dueDate(DateTime value) => throw _privateConstructorUsedError;
  TodoStatus get status => throw _privateConstructorUsedError;
  set status(TodoStatus value) => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $TodoDTOCopyWith<TodoDTO> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TodoDTOCopyWith<$Res> {
  factory $TodoDTOCopyWith(TodoDTO value, $Res Function(TodoDTO) then) =
      _$TodoDTOCopyWithImpl<$Res, TodoDTO>;
  @useResult
  $Res call(
      {int id,
      DateTime createdTime,
      DateTime? modifyTime,
      String title,
      DateTime dueDate,
      TodoStatus status});
}

/// @nodoc
class _$TodoDTOCopyWithImpl<$Res, $Val extends TodoDTO>
    implements $TodoDTOCopyWith<$Res> {
  _$TodoDTOCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? createdTime = null,
    Object? modifyTime = freezed,
    Object? title = null,
    Object? dueDate = null,
    Object? status = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      createdTime: null == createdTime
          ? _value.createdTime
          : createdTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
      modifyTime: freezed == modifyTime
          ? _value.modifyTime
          : modifyTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      dueDate: null == dueDate
          ? _value.dueDate
          : dueDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as TodoStatus,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$TodoDTOImplCopyWith<$Res> implements $TodoDTOCopyWith<$Res> {
  factory _$$TodoDTOImplCopyWith(
          _$TodoDTOImpl value, $Res Function(_$TodoDTOImpl) then) =
      __$$TodoDTOImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {int id,
      DateTime createdTime,
      DateTime? modifyTime,
      String title,
      DateTime dueDate,
      TodoStatus status});
}

/// @nodoc
class __$$TodoDTOImplCopyWithImpl<$Res>
    extends _$TodoDTOCopyWithImpl<$Res, _$TodoDTOImpl>
    implements _$$TodoDTOImplCopyWith<$Res> {
  __$$TodoDTOImplCopyWithImpl(
      _$TodoDTOImpl _value, $Res Function(_$TodoDTOImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? createdTime = null,
    Object? modifyTime = freezed,
    Object? title = null,
    Object? dueDate = null,
    Object? status = null,
  }) {
    return _then(_$TodoDTOImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      createdTime: null == createdTime
          ? _value.createdTime
          : createdTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
      modifyTime: freezed == modifyTime
          ? _value.modifyTime
          : modifyTime // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      dueDate: null == dueDate
          ? _value.dueDate
          : dueDate // ignore: cast_nullable_to_non_nullable
              as DateTime,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as TodoStatus,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$TodoDTOImpl implements _TodoDTO {
  _$TodoDTOImpl(
      {required this.id,
      required this.createdTime,
      this.modifyTime,
      required this.title,
      required this.dueDate,
      this.status = TodoStatus.unknown});

  factory _$TodoDTOImpl.fromJson(Map<String, dynamic> json) =>
      _$$TodoDTOImplFromJson(json);

  @override
  int id;
  @override
  DateTime createdTime;
  @override
  DateTime? modifyTime;
  @override
  String title;
  @override
  DateTime dueDate;
  @override
  @JsonKey()
  TodoStatus status;

  @override
  String toString() {
    return 'TodoDTO(id: $id, createdTime: $createdTime, modifyTime: $modifyTime, title: $title, dueDate: $dueDate, status: $status)';
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$TodoDTOImplCopyWith<_$TodoDTOImpl> get copyWith =>
      __$$TodoDTOImplCopyWithImpl<_$TodoDTOImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$TodoDTOImplToJson(
      this,
    );
  }
}

abstract class _TodoDTO implements TodoDTO {
  factory _TodoDTO(
      {required int id,
      required DateTime createdTime,
      DateTime? modifyTime,
      required String title,
      required DateTime dueDate,
      TodoStatus status}) = _$TodoDTOImpl;

  factory _TodoDTO.fromJson(Map<String, dynamic> json) = _$TodoDTOImpl.fromJson;

  @override
  int get id;
  set id(int value);
  @override
  DateTime get createdTime;
  set createdTime(DateTime value);
  @override
  DateTime? get modifyTime;
  set modifyTime(DateTime? value);
  @override
  String get title;
  set title(String value);
  @override
  DateTime get dueDate;
  set dueDate(DateTime value);
  @override
  TodoStatus get status;
  set status(TodoStatus value);
  @override
  @JsonKey(ignore: true)
  _$$TodoDTOImplCopyWith<_$TodoDTOImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
