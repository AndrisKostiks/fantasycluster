$(() => {
    $('.j_player_card').click(() => {
        setTimeout(() => {
            let player = $('div.list-group')
                .find('.active')
                .find('input')
                .val();
            let playerInput = $('#j_enter_form').find('.j_enter_player');
            playerInput.val(player)
        }, 50)
    });
});