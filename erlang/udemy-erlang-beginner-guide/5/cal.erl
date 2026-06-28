-module(cal).

%% API
-export([leap/1]).

leap(Year) ->
  if 
    Year rem 400 == 0 -> leap;
    Year rem 100 == 0 -> non_leap;
    Year rem 4 == 0 -> leap;
    true -> non_leap
  end.