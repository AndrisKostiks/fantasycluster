$(() => {
    $('.j_player_card').click(() => {
        setTimeout(() => {
            let player = $('div.list-group')
                .find('.active')
                .find('input')
                .val();
            let playerInput = $('#j_enter_form').find('.j_enter_player');
            let playerInputDelete = $('#j_delete_form').find('.j_delete_player');
            playerInputDelete.val(player);
            playerInput.val(player);
        }, 50)
    });
});
function showDelete() {
    $("#j_delete_form").removeClass("d-none");
    $("#j_delete_form").addClass("d-inline");
}