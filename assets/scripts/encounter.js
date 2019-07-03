const init = () => {
    const str = $('#str').val();
    const int = $('#int').val();
    const wis = $('#wis').val();
    const agi = $('#agi').val();
    const lck = $('#lck').val();
    console.log("hello");
    let stats = JSON.stringify({
        str,
        int,
        agi,
        wis,
        lck
    });

    stats = JSON.parse(stats);

    console.log(stats.str);
    console.log("---------------------");
    // console.log(m);
    // console.log("---------------------");
    // console.log(pstats);
    // console.log("---------------------");
    // console.log(pclass);
    // console.log("---------------------");
    // console.log(pinv);
    // console.log("---------------------");
    // console.log(peq);
    // console.log("---------------------");
    // SETTING MY HP
    let hpp = stats.str * 0.01;
    let mpp = stats.int * 0.01;
    $("#j_my-hp")
        .text(stats.str / hpp + "% HP")
        .css("width", "100%")
        .attr("aria-valuenow", stats.str * 15);
    $("#j_my-mp")
        .text(stats.int / mpp + "% MP")
        .css("width", "100%")
        .attr("aria-valuenow", stats.int * 15);
    // SETTING MOB HP
    getCur(stats);
    $("#j_mob-hp")
        .text(stats.str / hpp + "% HP")
        .css("width", "100%")
        .attr("aria-valuenow", stats.str * 15);
    actions = stats.agi / 3;
    if (actions < 1) actions = 1;
    $('#j_actions').text(Math.floor(actions) + " Actions left");
    return (stats);
};
var actions;
var curhp;
var evasion;
var curmp;
var curmobhp;
var actions;
var res = [];

const getCur = (stats) => {
    console.log('hello');
    curhp = stats.str * 15;
    curmp = stats.int * 15;
    curmobhp = stats.str * 15;
    actions = stats.agi / 3;
    let cur = {
        curhp,
        curmp,
        curmobhp,
        actions
    };
    return cur;
};
let strike = (stats, curmobhp, actions) => {
    if (actions >= 1) {
        let dmg = Math.floor(Math.random() * stats.str) + (stats.str - 5);
        if (dmg <= 0) dmg = 1;
        let crit = Math.floor(Math.random() * (100 - stats.lck) + stats.lck);
        crit = crit * stats.lck;
        if (crit > 100) dmg = dmg * stats.lck;
        if (crit > 200) dmg = dmg * stats.lck;

        curmobhp = curmobhp - dmg;

        $("#j_mob-hp")
            .text(Math.round(curmobhp / (stats.str * 15 * 0.01)) + "% HP")
            .css("width", curmobhp / (stats.str * 15 * 0.01) + "%")
            .attr("aria-valuenow", curmobhp);
        actions = actions - 1;
        $('#j_actions').text(Math.floor(actions) + " Actions left");
        $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-success'> You </span> dealt <span class='text-danger'>" + dmg + "</span> damage with a strike. </p>");
        if (curmobhp <= 0) {
            $('#winnerModal').modal({
                backdrop: 'static',
                keyboard: false
            });
            $("#winnerModal").modal('show');
        } else {
            return curmobhp;
        }
    } else {
        $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-info'>End the turn, you have no actions left!</span></p>");
        return curmobhp;
    }
};
let conjure = (stats, curmobhp, curmp, actions) => {
    res = [];
    if (actions >= 1 && curmp >= 1) {
        let dmg = Math.floor(Math.random() * stats.int) + (stats.int - 7);
        if (dmg <= 0) dmg = 1;
        let crit = Math.floor(Math.random() * (100 - stats.lck) + stats.lck);
        crit = crit * stats.lck;
        if (crit > 100) dmg = dmg * stats.lck;
        if (crit > 200) dmg = dmg * stats.lck;
        console.log(curmobhp);
        curmobhp = curmobhp - dmg;
        console.log(curmobhp);

        $("#j_mob-hp")
            .text(Math.floor(curmobhp / (stats.str * 15 * 0.01)) + "% HP")
            .css("width", curmobhp / (stats.str * 15 * 0.01) + "%")
            .attr("aria-valuenow", curmobhp);
        actions = actions - 1;
        $('#j_actions').text(Math.floor(actions) + " Actions left");
        $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-success'> You </span> dealt <span class='text-danger'>" + dmg + "</span> damage with a spell. </p>");
        curmp = curmp- (stats.int * 0.2) ;
        $("#j_my-mp")
            .text(Math.floor(curmp / (stats.int * 15 * 0.01)) + "% HP")
            .css("width", curmp / (stats.int * 15 * 0.01) + "%")
            .attr("aria-valuenow", curmp);
        res.push(curmobhp);
        res.push(curmp);
        if (curmobhp <= 0) {
            $('#winnerModal').modal({
                backdrop: 'static',
                keyboard: false
            });
            $("#winnerModal").modal('show');
        } else {
            return res;
        }
    } else {
        $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-info'>End the turn, you have no actions left!</span></p>");
        res.push(curmobhp);
        return res;
    };
};
let evade = (stats, curmobhp, actions) => {
    if (actions >= 1) {
        evasion = Math.floor(Math.random() * (100 - stats.agi) + stats.agi);
        if (evasion >= 50) {
            $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-info'>You are ready to evade next turn!</span></p>");
            actions = actions - 1;
            $('#j_actions').text(Math.floor(actions) + " Actions left");
            return 1;
        } else {
            $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-info'>You loose your footing in the last moment!</span></p>");
            actions = actions - 1;
            $('#j_actions').text(Math.floor(actions) + " Actions left");
            return 0;
        }
    } else {
        $('#log-area').html($('#log-area').html() + "<p class='text-warning'> <span class='text-info'>End the turn, you have no actions left!</span></p>");
        res.push(curmobhp);
        return res;
    };
};
let skip = (stats,) => {
    mstr = Math.floor(Math.random() * stats.str) + (stats.str - 5);
    if (mstr <= 0) mstr = 1;
    dmg = Math.floor(Math.random() * (mstr - mstr)) + mstr;
    if (dmg <= 0) dmg = 1;
    curhp = curhp - dmg;
    console.log(curhp);
    $("#j_my-hp")
        .text(Math.floor(curhp / (stats.str * 15 * 0.01)) + "% HP")
        .css("width", curhp / (stats.str * 15 * 0.01) + "%")
        .attr("aria-valuenow", curhp);
    $('#log-area').html($('#log-area').html() + "<p class='text-warning'><span class='text-danger'> Enemy </span> is striking you for " + dmg + "</p>");
};
let turn = (stats, curmp, curhp, evasion, actions) => {
    if (curmobhp > 0 && curhp > 0) {
        let dmg;
        $('#log-area').html($('#log-area').html() + "<p class='text-danger'> Enemy is making his turn!</p>");
        let moba = Math.floor(Math.random() * 4) + 1;
        console.log("case" + moba)
        switch (moba) {
            case 1:
                if (evasion == 1) {
                    $('#log-area').html($('#log-area').html() + "<p class='text-warning'>You evaded!</p>");
                    evasion = 0;
                    return curhp;
                } else {
                    mstr = Math.floor(Math.random() * stats.str) + (stats.str - 5);
                    if (mstr <= 0) mstr = 1;
                    dmg = Math.floor(Math.random() * (mstr - mstr)) + mstr;
                    if (dmg <= 0) dmg = 1;
                    curhp = curhp - dmg;
                    console.log(curhp);
                    $("#j_my-hp")
                        .text(Math.floor(curhp / (stats.str * 15 * 0.01)) + "% HP")
                        .css("width", curhp / (stats.str * 15 * 0.01) + "%")
                        .attr("aria-valuenow", curhp);
                    $('#log-area').html($('#log-area').html() + "<p class='text-warning'><span class='text-danger'> Enemy </span> is striking you for " + dmg + "</p>");
                    return curhp;
                }
                break;
            case 2:
                if (evasion == 1) {
                    $('#log-area').html($('#log-area').html() + "<p class='text-warning'>You evaded!</p>");
                    evasion = 0;
                    return curhp;
                } else {
                    mint = Math.floor(Math.random() * stats.int) + (stats.int - 7);
                    if (mstr <= 0) mstr = 1;
                    dmg = Math.floor(Math.random() * (mint - mint)) + mint;
                    if (dmg <= 0) dmg = 1;
                    curhp = curhp - dmg;
                    console.log(curhp);
                    $("#j_my-hp")
                        .text(Math.floor(curhp / (stats.str * 15 * 0.01)) + "% HP")
                        .css("width", curhp / (stats.str * 15 * 0.01) + "%")
                        .attr("aria-valuenow", curhp);
                    $('#log-area').html($('#log-area').html() + "<p class='text-warning'><span class='text-danger'> Enemy </span> is casting magic on you for " + dmg + "</p>");
                    return curhp;
                }
                break;
            case 3:
                mstr = Math.floor(Math.random() * stats.agi) + (stats.agi - 5);
                if (mstr <= 0) mstr = 1;
                dmg = Math.floor(Math.random() * (mstr - mstr)) + mstr;
                if (dmg <= 0) dmg = 1;
                curhp = curhp - dmg;
                console.log(curhp);
                $("#j_my-hp")
                    .text(Math.floor(curhp / (stats.str * 15 * 0.01)) + "% HP")
                    .css("width", curhp / (stats.str * 15 * 0.01) + "%")
                    .attr("aria-valuenow", curhp);
                $('#log-area').html($('#log-area').html() + "<p class='text-warning'><span class='text-danger'> Enemy </span> is striking you for " + dmg + "</p>");
                return curhp;
                break;
            case 4:
                mstr = Math.floor(Math.random() * stats.str) + (stats.str - 5);
                if (mstr <= 0) mstr = 1;
                dmg = Math.floor(Math.random() * (mstr - mstr)) + mstr;
                if (dmg <= 0) dmg = 1;
                curhp = curhp - dmg;
                console.log(curhp);
                $("#j_my-hp")
                    .text(Math.floor(curhp / (stats.str * 15 * 0.01)) + "% HP")
                    .css("width", curhp / (stats.str * 15 * 0.01) + "%")
                    .attr("aria-valuenow", curhp);
                $('#log-area').html($('#log-area').html() + "<p class='text-warning'><span class='text-danger'> Enemy </span> is striking you for " + dmg + "</p>");
                return curhp;
                break;
        }
    } else if (curhp <= 0) {
        $('#loserModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $("#loserModal").modal('show');
    } else {
        $('#winnerModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $("#winnerModal").modal('show');
    }

};
$(() => {
    let stats = init();

    $('#j_strike').on('click', () => {
        curmobhp = strike(stats, curmobhp, actions);
        actions--;
    });
    $('#j_conjure').on('click', () => {
        res = conjure(stats, curmobhp, curmp, actions);
        curmobhp = res[0];
        if (res[1]) {
            curmp = res[1];
            $("#j_my-mp")
                .text(Math.floor(curmp / (stats.int * 15 * 0.01)) + "% HP")
                .css("width", curmp / (stats.int * 15 * 0.01) + "%")
                .attr("aria-valuenow", curmp);
        };
        actions--;
    });
    $('#j_evade').on('click', () => {
        evasion = evade(stats, curmobhp, actions);
        actions--;
        $('#j_actions').text(Math.floor(actions) + " Actions left");
    });
    $('#j_skip').on('click', () => {
        skip(stats);
        actions++;
        $('#j_actions').text(Math.floor(actions) + " Actions left");
    });
    $('#j_turn').on('click', () => {
        curhp = turn(stats, curmp, curhp, evasion, actions);
        if (actions <= 0) {
            actions = stats.agi / 3;
            if (actions < 1) actions = 1;
            $('#j_actions').text(Math.floor(actions) + " Actions left");
        } else {
            $('#j_actions').text(Math.floor(actions) + " Actions left");
        }
    });
});