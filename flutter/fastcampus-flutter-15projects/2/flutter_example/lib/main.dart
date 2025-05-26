import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Body(),
      ),
    ),
  );
}

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        TestCheckBox(),
        TestRadioButton(),
        TestSlider(),
        TestSwitch(),
        TestPopupMenu(),
      ],
    );
  }
}

class TestCheckBox extends StatefulWidget {
  const TestCheckBox({super.key});

  @override
  State<TestCheckBox> createState() => _TestCheckBoxState();
}

class _TestCheckBoxState extends State<TestCheckBox> {
  late List<bool> values;

  @override
  void initState() {
    super.initState();
    values = [false, false, false];
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Checkbox(
          value: values[0],
          onChanged: (value) => changeValue(0, value: value),
        ),
        Checkbox(
          value: values[1],
          onChanged: (value) => changeValue(1, value: value),
        ),
        Checkbox(
          value: values[2],
          onChanged: (value) => changeValue(2, value: value),
        ),
      ],
    );
  }

  void changeValue(int index, {bool? value = false}) {
    setState(() {
      values[index] = value!;
    });
  }
}

class TestRadioButton extends StatefulWidget {
  const TestRadioButton({super.key});

  @override
  State<TestRadioButton> createState() => _TestRadioButtonState();
}

enum TestTestValue {
  test1,
  test2,
  test3,
}

class _TestRadioButtonState extends State<TestRadioButton> {
  TestTestValue? selectValue;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          leading: Radio<TestTestValue>(
            value: TestTestValue.test1,
            groupValue: selectValue,
            onChanged: (value) => setState(() => selectValue = value!),
          ),
          title: Text(TestTestValue.test1.name),
          onTap: () => {
            setState(() {
              if (selectValue != TestTestValue.test1) {
                selectValue = TestTestValue.test1;
              }
            }),
          },
        ),
        ListTile(
          leading: Radio<TestTestValue>(
            value: TestTestValue.test2,
            groupValue: selectValue,
            onChanged: (value) => setState(() => selectValue = value!),
          ),
          title: Text(TestTestValue.test2.name),
        ),
        ListTile(
          leading: Radio<TestTestValue>(
            value: TestTestValue.test3,
            groupValue: selectValue,
            onChanged: (value) => setState(() => selectValue = value!),
          ),
          title: Text(TestTestValue.test3.name),
        ),
      ],
    );
  }
}

class TestSlider extends StatefulWidget {
  const TestSlider({super.key});

  @override
  State<TestSlider> createState() => _TestSliderState();
}

class _TestSliderState extends State<TestSlider> {
  double value = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('$value'),
        Slider(
          value: value,
          onChanged: (newValue) => setState(() => value = newValue),
          divisions: 100,
          max: 100,
          min: 0,
          label: value.round().toString(),
          // activeColor: Colors.red,
        ),
      ],
    );
  }
}

class TestSwitch extends StatefulWidget {
  const TestSwitch({super.key});

  @override
  State<TestSwitch> createState() => _TestSwitchState();
}

class _TestSwitchState extends State<TestSwitch> {
  bool value = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Switch(
          value: value,
          onChanged: (newValue) => setState(() => value = newValue),
        ),
        CupertinoSwitch(
          value: value,
          onChanged: (newValue) => setState(() => value = newValue),
        ),
      ],
    );
  }
}

class TestPopupMenu extends StatefulWidget {
  const TestPopupMenu({super.key});

  @override
  State<TestPopupMenu> createState() => _TestPopupMenuState();
}

class _TestPopupMenuState extends State<TestPopupMenu> {
  TestTestValue selectValue = TestTestValue.test1;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(selectValue.name),
        PopupMenuButton(
          itemBuilder: (context) {
            return TestTestValue.values
                .map(
                  (value) => PopupMenuItem(
                    value: value,
                    child: Text(value.name),
                  ),
                )
                .toList();
          },
          onSelected: (value) => setState(() => selectValue = value),
        ),
      ],
    );
  }
}
