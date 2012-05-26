class BB.DatePicker extends BB.ModalPicker

    create_date : ->
        item.value = @string_to_date item.value
    

    string_to_date : (date_string) ->
        date_string = date_string || '';
        matches = /(\d+)\/(\d+)\/(\d+)/.exec(date_string);

        if (matches && matches.length >= 4)
            return new Date(matches[3], matches[1] - 1, matches[2]);

        return new Date();

    date_to_string : (date) ->
        (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()