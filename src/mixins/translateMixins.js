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
    topicToKorean(key) {
      switch (key) {
        case 'running':
          return '러닝';
        case 'plogging':
          return '플로깅';
        default:
          return '잡담';
      }
    },
  },
};
export default translateMixins;
