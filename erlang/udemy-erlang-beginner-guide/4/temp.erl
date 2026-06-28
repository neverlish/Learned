-module(temp).

%% API
-export([convert/1, convert/2]).

convert(F, fahrenheit) ->
  (F - 32) * 5 / 9;
convert(C, celsius) ->
  (C * 9 / 5) + 32.

convert({fahrenheit, X}) ->
  Y = (X - 32) * 5 / 9,
  {celsius, Y};
convert({celsius, X}) ->
  Y = (X * 9 / 5) + 32,
  {fahrenheit, Y}.
  