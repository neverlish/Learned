import 'package:e_commerce_app/core/utils/error/error_response.dart';
import 'package:e_commerce_app/data/data_source/remote/display/display.api.dart';
import 'package:e_commerce_app/data/repository_impl/display.repository_impl.dart';
import 'package:e_commerce_app/domain/model/common/result.dart';
import 'package:e_commerce_app/domain/model/display/menu/menu.model.dart';
import 'package:e_commerce_app/domain/repository/display.repository.dart';
import 'package:e_commerce_app/domain/usecase/display/display.usecase.dart';
import 'package:e_commerce_app/domain/usecase/display/menu/get_menus.usecase.dart';
import 'package:e_commerce_app/presentation/main/cubit/mall_type_cubit.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockDisplayRepository extends Mock implements DisplayRepository {}

class MockGetMenusUsecase extends Mock implements GetMenusUsecase {}

class MockDisplayApi extends Mock implements DisplayApi {}

void main() {
  group('display_usecase', () {
    late DisplayRepository displayRepository;
    late DisplayUsecase displayUsecase;

    setUp(() {
      displayRepository = DisplayRepositoryImpl(MockDisplayApi());
      displayUsecase = DisplayUsecase(displayRepository);
    });

    test('의존성이 정상적으로 주입되었다.', () => expect(displayUsecase, isNotNull));

    test('메뉴리스트 성공', () async {
      final result = Result.success([Menu(tabId: -1, title: '패캠추천')]);
      final usecase = MockGetMenusUsecase();

      when(() => usecase.mallType).thenReturn(MallType.market);
      when(
        () => usecase.call(displayRepository),
      ).thenAnswer((_) async => result);

      final actual = await displayUsecase.execute(usecase: usecase);
      expect(actual, result);
    });

    test('메뉴리스트 실패', () async {
      final result = Result<List<Menu>>.failure(
        ErrorResponse(status: 'base_error'),
      );
      final usecase = MockGetMenusUsecase();

      when(() => usecase.mallType).thenReturn(MallType.market);
      when(
        () => usecase.call(displayRepository),
      ).thenAnswer((_) async => result);

      final actual = await displayUsecase.execute(usecase: usecase);
      expect(actual, result);
    });
  });
}
