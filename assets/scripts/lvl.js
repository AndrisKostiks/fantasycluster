let points = 5;
let old;
$(() => {
    $("#j_points").html(`Points : ${points}`);
    old = 123;
    $('.j_lvl_i').click(function () {
        if (points > 5) points = 5;
        var direction = this.defaultValue < this.value;
        this.defaultValue = this.value;
        if (old == this.value) {
            // alert('stay');
            $("#j_points").html(`Points : ${points}`);
            if (points > 5) points = 5;

        } else if (direction) {
            points--;
            // alert('increased');
            // cur = $(this).val();
            // prev = cur++;
            if (points < 0) points = 0;

            $("#j_points").html(`Points : ${points}`);
            if (points > 5) points = 5;

        } else {
            points++;
            if (points > 5) points = 5;

            // alert('decrease');
            $("#j_points").html(`Points : ${points}`);
            if (points > 5) points = 5;

        }
        old = this.value;
        if (points > 5) points = 5;
        // $(this).val();
    });
});