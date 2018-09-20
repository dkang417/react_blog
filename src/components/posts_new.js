import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


class PostsNew extends Component {

    // field argument returns jsx and wires up to Field
    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>    
                <input
                    className="form-control"    
                    type="text"
                    {...field.input}
                />
                {field.meta.error}
            </div>
        );
    }
    

    onSubmit(values) {
        // this === component
        console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;


        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"    
                    name="title"
                    component={this.renderField}
                />    
                <Field
                    label="Categories"    
                    name="categories"
                    component={this.renderField}
                />   
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />   
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        );
    }
}


function validate(values) {
    // console.log(values)  gets back {title:'asdf', categories:'asdf', content: 'asdf'}

    const errors = {};
    // validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that is at least 3 characters";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = 'Enter some content please';
    }

    // if errors is empty, the form is fine to submit
    // if errors has any properties, redux form assumes form is invalid

    return errors;
}


export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);
