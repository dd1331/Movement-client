import dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.extend(relativeTime);
dayjs.locale('ko');
const dateMixins = {
  created() {
  },
  methods: {
    formatDate(date, options) {
      const diff = dayjs().diff(dayjs(date), 'd');
      if (diff > 2) {
        const format = options && options.format ? options.format : 'YYYY.MM.DD HH:mm';
        return dayjs(date).format(format);
      }
      return dayjs(date).fromNow();
    },
  },
};
export default dateMixins;
