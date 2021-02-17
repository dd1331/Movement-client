import dayjs from 'dayjs';

const dateMixins = {
  created() {
  },
  methods: {
    formatDate(date, options) {
      const format = options && options.format ? options.format : 'YYYY.MM.DD HH:MM';
      return dayjs(date).format(format);
    },
  },
};
export default dateMixins;
