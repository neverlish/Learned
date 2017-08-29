import MyLogger from './myLogger'
import _ from './utility';

_.log('my first test data');

const logger = new MyLogger();
_.log(`current hour is ${logger.getCurrentHour()}`);
_.log(`lectures are ${logger.getLectures()}`);
