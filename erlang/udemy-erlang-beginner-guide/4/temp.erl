-module(temp).

%% API
-export([convert/2]).

convert(F, fahrenheit) ->
  (F - 32) * 5 / 9;
convert(C, celsius) ->
  (C * 9 / 5) + 32.