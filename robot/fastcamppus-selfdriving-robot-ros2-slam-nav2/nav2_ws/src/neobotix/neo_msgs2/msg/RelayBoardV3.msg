
float64 time						# POSIX timestamp [usec]

string firmware_version				# firmware version

float64 uptime						# time since last module restart / reconfig [usec]

float32 ambient_temperature			# Ambient temperature inside the platform in [C].

bool[4] relay_states 				# state for each relay on RelayBoardV3; True = Active; False = Inactive

bool[4] digital_input_states 		# state for each digital inputs on RelayBoardV3; True = Active; False = Inactive

bool[4] keypad_button_states 		# state for each keyboard buttons on RelayBoardV3; True = Active; False = Inactive

bool key_switch_off_state 			# state of the key

bool release_structure_state 		# state of the entire robot

std_msgs/ColorRGBA led_state        # state of the LED

string[] system_error               # system errors