# This message holds all data available from Neobotix USBoard

std_msgs/Header header

float32[16] sensor 	#sensor measurement
int16[4] analog 	#analogue input
bool[16] active  	#active
bool[16] warn       #warn
bool[16] alarm      #alarm