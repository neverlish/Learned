import '../../domain/model/display/display.model.dart';
import '../dto/display/menu/menu.dto.dart';
import '../dto/display/view_module/view_module.dto.dart';

extension MenuEx on MenuDto {
  Menu toModel() {
    return Menu(tabId: tabId ?? 0, title: title ?? '');
  }
}

extension ViewModuleDtoEx on ViewModuleDto {
  ViewModule toModel() {
    return ViewModule(
      type: type ?? '',
      title: title ?? '',
      subtitle: subtitle ?? '',
      imageUrl: imageUrl ?? '',
    );
  }
}
