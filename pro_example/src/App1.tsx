import React, {
  useEffect, useRef,
  useState
} from "react";
import { HtmlExport, SaveDesignCallback } from "react-email-editor";
import data from "./sample.json";
import { QuickEditor } from "quick-email-editor";
import type { EditorRef, ParamType } from "quick-email-editor";
import quickToken, {
  generateSystemParam, getSystemParam, uploadImage
} from "./utils";
import './app.css';

const Index = () => {
  useEffect(() => {
    generateParam();
  }, []);
  const [systemParam, setSystemParam] = useState<ParamType | null>(null);
  const generateParam = async () => {
    const data = await getSystemParam();
    if (!data) {
      setSystemParam({});
      return;
    }
    let totalSettings: any = [];
    Object.keys(data).forEach((item) => {
      if (item !== "system" && data[item].settings) {
        const { settings } = data[item];
        totalSettings = totalSettings.concat(settings);
      }
    });
    const param = generateSystemParam(totalSettings);
    setSystemParam(param);
  };

  const ref = useRef<EditorRef>();
  const handleSave = () => {
    ref.current?.saveDesign((design: SaveDesignCallback) => {
      console.log(design);
    });
  };
  const handleExport = () => {
    ref.current?.exportHtml((data: HtmlExport) => {
      console.log(data.html);
    });
  };
  const handleExportImage = () => {
    ref.current?.exportImage((blob: Blob) => {
      console.log(blob);
    });
  };

  if (!systemParam) return <></>;
  return (
    <>
      <button style={{ position: "absolute" }} onClick={handleSave}>
        save
      </button>
      <button style={{ position: "absolute", left: 60 }} onClick={handleExport}>
        export html
      </button>
      <button
        style={{ position: "absolute", left: 160 }}
        onClick={handleExportImage}
      >
        export image
      </button>
      <QuickEditor
        ref={ref}
        quickToken={quickToken}
        getProductUrl="https://app-test.quickcep.com/integration-data/product/spu/page"
        data={data}
        height={document.documentElement.clientHeight - 8}
        systemParam={systemParam}
        uploadImage={uploadImage}
      />
    </>
  );
};

export default Index;
