var CREATED = "createdCallback";
var ENTERED_VIEW = "enteredViewCallback";
var LEFT_VIEW = "leftViewCallback";
var ATTR_CHANGED = "attributeChangedCallback";

var ATTR_VAL = "ATTR_VAL";

var INNER_HTML_1 = "INNER_HTML_1";
var INNER_HTML_2 = "INNER_HTML_2";

var fixture = document.getElementById("qunit-fixture");

function generateXTestPrototype(){
	// create the x-lotto prototype
	var XTestPrototype = Object.create(HTMLElement.prototype);
	XTestPrototype.createdCallback = function() {
		this.innerHTML = INNER_HTML_1;
		this.lifeCycle = CREATED;
	};
	XTestPrototype.enteredViewCallback = function() {
		this.lifeCycle = ENTERED_VIEW;
	};
	XTestPrototype.leftViewCallback = function() {
		this.lifeCycle = LEFT_VIEW;
	};
	XTestPrototype.attributeChangedCallback = function() {
		this.lifeCycle = ATTR_CHANGED;
	};

	// this will indicate the life cycle state during tests
	XTestPrototype.lifeCycle = null;

	return XTestPrototype;
}

test("Environment: APIs", function() {
	ok(window.MutationObserver, "window.MutationObserver exists");
	ok(document.register, "document.regster exists");
});

asyncTest("Custom Element: Callbacks", function() {
	var XTestPrototype = generateXTestPrototype();

	expect(4);

	// register the x-lotto element with the document
	var XTest = document.register("x-test", {
		prototype: XTestPrototype
	});

	var node = document.createElement("x-test");
	ok(node.lifeCycle === CREATED, "Custom element created callback");

	fixture.appendChild(node);
	setTimeout(function() {
		ok(node.lifeCycle === ENTERED_VIEW, "Custom element entered view callback");
		node.setAttribute("data-attr", ATTR_VAL);
		setTimeout(function() {
			ok(node.lifeCycle === ATTR_CHANGED, "Custom element attribute changed callback");
			node.outerHTML = "";
			setTimeout(function() {
				ok(node.lifeCycle === LEFT_VIEW, "Custom element left view callback");
				start();
			});
		});
	});
});

test("Custom Element: Manipulation", function() {
	var XTestPrototype = generateXTestPrototype();

	// register the x-lotto element with the document
	var XTest = document.register("x-test", {
		prototype: XTestPrototype
	});

	var node = document.createElement("x-test");
	fixture.appendChild(node);

	ok(document.querySelector("x-test"), "Custom element added");
	ok(document.querySelector("x-test").innerHTML === INNER_HTML_1, "Custom element HTML set");

	node.innerHTML = INNER_HTML_2;
	ok(node.innerHTML === INNER_HTML_2, "Custom element HTML changed");

	node.outerHTML = "";
	ok(document.querySelector("x-test") === null, "Custom element removed");

});