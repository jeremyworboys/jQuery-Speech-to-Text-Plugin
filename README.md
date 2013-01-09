# Speech to Text jQuery Plugin Example

## Usage

General usage is to select the input and/or textarea fields that you would like to enable speech to text on.

```javascript
$("input, textarea").speechToText();
```


### Options

#### inputResetClass
You may specify a class to reset any custom CSS you have applied to input fields. This is used as a dummy input has to be created to enable speech to text on textareas.


## Note
This plugin uses the HTML5 `speech` attribute which is currently only implemented by webkit (Chrome, Safari, iOS, Android, etc) and only natively on `<input>` elements.

This plugin was primarily designed to bring this functionality to the `<textarea>` element, but it is still limited by the support of the HTML5 `speech` attribute.


Email for [support](mailto:jw@jeremyworboys.com).
