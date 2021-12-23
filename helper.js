module.exports = new function () {
    this.formatDate = function (_date) {
        var result = '';

        _date = new Date(_date);

        result += _date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate();
        result += '.';
        result += _date.getMonth() + 1 > 9 ? (_date.getMonth() + 1) : ('0' + (_date.getMonth() + 1));
        result += '.';
        result += _date.getFullYear();

        return result;
    };


    this.getMessages = async function () {
        client.query({query: gql`query {
                messages {id,message}
      }`}).then((res) => {
          console.log(res)
         return res
        });

    }



}