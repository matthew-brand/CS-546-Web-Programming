import ui


def two50(sender):
	calculate(2.5)


def two75(sender):
	calculate(2.75)


def three(sender):
	calculate(3)


def three50(sender):
	calculate(3.5)


def four(sender):
	calculate(4)


def four50(sender):
	calculate(4.5)


def five(sender):
	calculate(5)


def six(sender):
	calculate(6)


def eight50(sender):
	calculate(8.5)


def morningPlus(sender):
	if (morningTextField.text != ""):
		morningTextField.text = str(int(morningTextField.text) + 1)
	else:
		morningTextField.text = str(1)


def morningMinus(sender):
	if (morningTextField.text != "" and int(morningTextField.text) > 0):
		morningTextField.text = str(int(morningTextField.text) - 1)


def addonsPlus(sender):
	addonsTextField.text = str(int(addonsTextField.text) + 1)


def addonsMinus(sender):
	if (int(addonsTextField.text) > 0):
		addonsTextField.text = str(int(addonsTextField.text) - 1)


def wastedPlus(sender):
	wastedTextField.text = str(int(wastedTextField.text) + 1)


def wastedMinus(sender):
	if (int(wastedTextField.text) > 0):
		wastedTextField.text = str(int(wastedTextField.text) - 1)


def countPlus(sender):
	if (countTextField.text != ""):
		countTextField.text = str(int(countTextField.text) + 1)
	else:
		countTextField.text = str(1)


def countMinus(sender):
	if (morningTextField.text != "" and int(countTextField.text) > 0):
		countTextField.text = str(int(countTextField.text) - 1)


def calculate(price):
	morning = int(morningTextField.text)
	addons = int(addonsTextField.text)
	wasted = int(wastedTextField.text)
	count = int(countTextField.text)
	sold = (morning + addons - wasted) - count
	total = sold * price
	soldLabel.text = "Sold: " + str(sold)
	totalLabel.text = "Total: " + str(total)


def clear(sender):
	morningTextField.text = ""
	addonsTextField.text = "0"
	wastedTextField.text = "0"
	countTextField.text = ""


v = ui.load_view()
v.present('sheet')

soldLabel = v['soldLabel']
totalLabel = v['totalLabel']
morningTextField = v['morningTextField']
addonsTextField = v['addonsTextField']
wastedTextField = v['wastedTextField']
countTextField = v['countTextField']

morningTextField.keyboard_type = ui.KEYBOARD_NUMBER_PAD
addonsTextField.keyboard_type = ui.KEYBOARD_NUMBER_PAD
wastedTextField.keyboard_type = ui.KEYBOARD_NUMBER_PAD
countTextField.keyboard_type = ui.KEYBOARD_NUMBER_PAD

