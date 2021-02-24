const translateMixins = {
  created() {
  },
  methods: {
    titleToKorean(key) {
      switch (key) {
        case 'exercise':
          return '운동';
        case 'environment':
          return '환경';
        case 'news':
          return '뉴스';
        case 'meetup':
          return '모임';
        default:
          return '잡담';
      }
    },
  },
};
export default translateMixins;
