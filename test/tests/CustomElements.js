var FIXTURE = document.getElementById("qunit-fixture");

var INNER_HTML_1 = "INNER_HTML_1";
var INNER_HTML_2 = "INNER_HTML_2";
var ATTR_VAL = "ATTR_VAL";
var TEST_TAG = "x-test";


test("Environment: APIs", function() {
	ok(window.MutationObserver, "window.MutationObserver exists");
	ok(document.register, "document.regster exists");
});


asyncTest("Custom Element: Callbacks", function() {
	var XTestPrototype = Object.create(HTMLElement.prototype);

	expect(4);

	var node = document.createElement(TEST_TAG);
	// register the x-lotto element with the document
	var XTest = document.register(TEST_TAG, {
		prototype: XTestPrototype
	});
	FIXTURE.appendChild(node);

	XTestPrototype.createdCallback = function() {
		ok(this === node, "Custom element created callback");
	};
	
	XTestPrototype.enteredViewCallback = function() {
		ok(this === node, "Custom element entered view callback");
		node.setAttribute("data-attr", ATTR_VAL);
	};
	
	XTestPrototype.attributeChangedCallback = function() {
		ok(this === node, "Custom element attribute changed callback");
		node.outerHTML = "";
	};

	XTestPrototype.leftViewCallback = function() {
		ok(this === node, "Custom element left view callback");
		start();
	};
});


test("Custom Element: Manipulation", function() {
	var XTestPrototype = Object.create(HTMLElement.prototype);
	XTestPrototype.createdCallback = function() {
		this.innerHTML = INNER_HTML_1;
	};

	// register the x-lotto element with the document
	var XTest = document.register(TEST_TAG, {
		prototype: XTestPrototype
	});

	var node = document.createElement(TEST_TAG);
	FIXTURE.appendChild(node);

	ok(document.querySelector(TEST_TAG), "Custom element added");
	ok(document.querySelector(TEST_TAG).innerHTML === INNER_HTML_1, "Custom element HTML set");

	node.innerHTML = INNER_HTML_2;
	ok(node.innerHTML === INNER_HTML_2, "Custom element HTML changed");

	node.outerHTML = "";
	ok(document.querySelector(TEST_TAG) === null, "Custom element removed");

});