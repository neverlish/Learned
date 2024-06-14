import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SearchPage extends ConsumerStatefulWidget {
  const SearchPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SearchPageState();
}

class _SearchPageState extends ConsumerState<SearchPage> {
  final _formKey = GlobalKey<FormState>();
  String? city;
  AutovalidateMode autovalidateMode = AutovalidateMode.disabled;

  void _submit() {
    setState(() {
      autovalidateMode = AutovalidateMode.always;
    });

    final form = _formKey.currentState;
    if (form != null && form.validate()) {
      form.save();
      Navigator.of(context).pop(city);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Search'),
      ),
        body: Form(
          key: _formKey,
          autovalidateMode: autovalidateMode,
          child: Column(
            children: [
              const SizedBox(height: 60.0),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30.0),
                child: TextFormField(
                  autofocus: true,
                  style: const TextStyle(fontSize: 18.0),
                  decoration: const InputDecoration(
                    labelText: 'City name',
                    hintText: 'more than 2 characters',
                    prefix: Icon(Icons.search),
                    border: OutlineInputBorder(),
                  ),
                  validator: (String? input) {
                    if (input == null || input.trim().length < 2) {
                      return 'City name must be at least 2 characters long';
                    }
                    return null;
                  },
                  onSaved: (String? input) {
                    city = input;
                  },
                ),
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: _submit,
                child: const Text(
                  "How's weather?",
                  style: TextStyle(fontSize: 20.0),
                ),
              )
            ],
          ),
        )
    );
  }
}
