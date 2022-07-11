import React from 'react';
import Form, { valueType } from './Form';
import FormItem from "./FormItem";
import Input from "./Input";
const TestForm = () => {
  const form = React.useRef<Form>(null);
  const submit = () => {
    /* 表单提交 */
    form.current!.submitForm((formValue: valueType) => {
      console.log(formValue);
    });
  };
  const reset = () => {
    /* 表单重置 */
    form.current!.resetForm();
  };
  return (
    <div className="box">
      <Form ref={form}>
        <FormItem label="我是" name="name">
          <Input />
        </FormItem>
        <FormItem label="我想对大家说" name="mes">
          <Input />
        </FormItem>
        <input placeholder="不需要的input" />
        <Input />
      </Form>
      <div className="btns">
        <button className="searchbtn" onClick={submit}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
    </div>
  );
};
export default TestForm;
