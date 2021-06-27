<template>
  <p class="has-text-right">
    <a ref="download" @click="makeCSV">
      <button class="button">
          <span>Download data as CSV</span>
        </button>
    </a>
  </p>
</template>

<script>
export default {
  props: ['results'],
  methods: {
    makeCSV() {

      function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
          if (data == null || !data.length) {
          return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += '"' + item[key] + '"';
        ctr++;
        });
        result += lineDelimiter;
        });
        return result;
      }

      var csv = 'data:text/csv;charset=utf-8,' + convertArrayOfObjectsToCSV(
        {'data': this.results.results});
      var data = encodeURI(csv);
      var filename = this.results.query.join("+")
      this.$refs.download.setAttribute('href', data);
      this.$refs.download.setAttribute('download', filename + ".csv");
    }
  }
}

</script>