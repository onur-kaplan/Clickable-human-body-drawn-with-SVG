var
    svg = document.getElementById('humanAnatomy'),
    //NS = svg.getAttribute('xmlns'),
    NS = $('svg').attr('xmlns'),
    pinForm = $('#pinForm'),
    btnOK = $('#btnSuccess'),
    btnCancel = $('#btnDanger'),
    pinConfirm = $('#pinConfirm'),
    btnConfirmTrue = $('#btnConfirmTrue'),
    btnConfirmCancel = $('#btnConfirmCancel'),
    pinConfirmSucces = $('#pinConfirmSucces'),
    pinConfirmBtns = $('#pinConfirmBtns');

$(document).on('click', '#humanInner', function(e) {
    var
        t = e.target,
        x = e.clientX,
        y = e.clientY,
        target = (t == svg ? svg : t.parentNode),
        pin = pinCenter(target, x, y),
        newCircIdParam = "newcircle" + Math.round(pin.x) + '-' + Math.round(pin.y),
        circle = document.createElementNS(NS, 'circle');
    circle.setAttributeNS(null, 'cx', Math.round(pin.x));
    circle.setAttributeNS(null, 'cy', Math.round(pin.y));
    circle.setAttributeNS(null, 'r', 10);
    circle.setAttributeNS(null, 'class', "newcircle");
    circle.setAttributeNS(null, 'id', newCircIdParam);
    circle.setAttributeNS(null, 'data-x', Math.round(pin.x));
    circle.setAttributeNS(null, 'data-y', Math.round(pin.y));
    target.after(circle);

    pinConfirm.show();
    pinConfirmBtns.css({
        "left": (x + 20) + 'px',
        "top": (y) + 'px'
    });

    /* Confirm the position of the added Circle*/
    btnConfirmTrue.click(function() {
        pinConfirm.hide();
        pinForm.show();
    });

    /* Fill the form, send it or give it up*/
    btnOK.click(function() {
        pinForm.hide();
        pinConfirmSucces.show();
    });

    btnCancel.click(function() {
        pinForm.hide();
        pinConfirm.show();
    });

    /* After confirmation completion*/
    pinConfirmSucces.click(function() {
        pinConfirmSucces.hide();
    });
});

function pinCenter(element, x, y) {
    var pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(element.getScreenCTM().inverse());
}

$(document).on('click', '.newcircle', function() {
    alert("x: " + $(this).data('x') + " y: " + $(this).data("y"));
});

btnConfirmCancel.click(function() {
    $("#humanInner + .newcircle").remove();
    pinConfirm.hide();
});