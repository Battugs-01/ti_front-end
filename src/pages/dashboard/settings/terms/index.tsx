import { SaveOutlined } from "@ant-design/icons";
import { ProFormRadio } from "@ant-design/pro-form";
import { clippingParents } from "@popperjs/core";
import { useRequest } from "ahooks";
import { Button, notification, Popconfirm, Tabs } from "antd";
import BraftEditor from "braft-editor";
import TextEditorForm from "components/form_braft";
import { FC, useEffect, useState } from "react";
import settings, { keys } from "service/settings";
import { Config, TermsModel } from "service/settings/types";

const TermsTab: FC = ({ }) => {
  const { data, refresh } = useRequest(async () =>
    settings.get<Config>(keys.terms)
  );
  const { run: update, loading: saving } = useRequest(
    settings.set<TermsModel>,
    {
      manual: true,
      onSuccess: () => {
        notification.success({
          message: "Success",
        });
        refresh();
      },
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );
  const [selectedOption, setSelectedOption] = useState<"user" | "merchant">(
    "user"
  );

  const { userAppTerms, merchantAppTerms, userAppTermsCn, userAppTermsEn, userAppTermsKr, userAppTermsRu } = JSON.parse(data?.value || "{}");

  const [lang, setLang] = useState("mn");

  useEffect(() => {
    if (data) {
      if (selectedOption === "user") {
        switch (lang) {
          case "mn":
            setBodyContent(BraftEditor.createEditorState(userAppTerms))
            break;
          case "en":
            setBodyContent(BraftEditor.createEditorState(userAppTermsEn))
            break;
          case "ru":
            setBodyContent(BraftEditor.createEditorState(userAppTermsRu))
            break;
          case "cn":
            setBodyContent(BraftEditor.createEditorState(userAppTermsCn))
            break;
          case "kr":
            setBodyContent(BraftEditor.createEditorState(userAppTermsKr))
            break;
          default:
            break;
        }
      }
      else setBodyContent(BraftEditor.createEditorState(merchantAppTerms));
    }
  }, [selectedOption, data, lang]);

  const [bodyContent, setBodyContent] = useState<any>("");

  const saveFunction = () => {
    if (selectedOption === "user") {
      let htmlBody = bodyContent.toHTML();
      let json: TermsModel = {
        merchantAppTerms: merchantAppTerms || "",
        userAppTerms,
        userAppTermsCn,
        userAppTermsEn,
        userAppTermsKr,
        userAppTermsRu
      }
      switch (lang) {
        case "mn":
          json.userAppTerms = htmlBody
          break;
        case "en":
          json.userAppTermsEn = htmlBody
          break;
        case "kr":
          json.userAppTermsKr = htmlBody
          break;
        case "cn":
          json.userAppTermsCn = htmlBody
          break;
        case "ru":
          json.userAppTermsRu = htmlBody
          break;
        default:
          break;
      }
      update(keys.terms, { ...json });
    } else
      update(keys.terms, {
        userAppTerms: userAppTerms || "",
        merchantAppTerms: bodyContent.toHTML(),
      });
  };

  const discardFunction = () => {
    if (selectedOption === "user") {
      switch (lang) {
        case "en":
          setBodyContent(BraftEditor.createEditorState(userAppTermsEn))
          break;
        case "mn":
          setBodyContent(BraftEditor.createEditorState(userAppTerms))
          break;
        case "ru":
          setBodyContent(BraftEditor.createEditorState(userAppTermsRu))
          break;
        case "cn":
          setBodyContent(BraftEditor.createEditorState(userAppTermsCn))
          break;
        case "kr":
          setBodyContent(BraftEditor.createEditorState(userAppTermsKr))
          break;
        default:
          break;
      }
    } else setBodyContent(BraftEditor.createEditorState(merchantAppTerms));
  };

  const isEdited = () => {
    if (bodyContent) {
      let htmlBody = bodyContent.toHTML()
      if (selectedOption === "user") {
        switch (lang) {
          case "mn":
            return htmlBody !== userAppTerms
          case "en":
            return htmlBody !== userAppTermsEn
          case "cn":
            return htmlBody !== userAppTermsCn
          case "ru":
            return htmlBody !== userAppTermsRu
          case "kr":
            return htmlBody !== userAppTermsKr
        }
      } else return bodyContent.toHTML() !== merchantAppTerms;
    }
    return false;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <ProFormRadio.Group
          radioType="button"
          initialValue={"user"}
          options={[
            {
              label: "User App",
              value: "user",
            },
            {
              label: "Merchant App",
              value: "merchant",
            },
          ]}
          fieldProps={{
            size: "large",
            className: "text-md font-semibold",
            onChange: (e) => {
              setSelectedOption(e.target.value);
              if (e.target.value === "merchant") {
                setLang("en");
              }

            },
            value: selectedOption,
          }}
        />
        {isEdited() && (
          <div className="space-x-2">
            <Popconfirm
              title="Are you sure to discard your changes?"
              onConfirm={discardFunction}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                size="large"
                type="dashed"
                icon={<SaveOutlined size={16} />}
                loading={saving}
              >
                Discard
              </Button>
            </Popconfirm>

            <Button
              size="large"
              type="primary"
              icon={<SaveOutlined size={16} />}
              onClick={saveFunction}
              loading={saving}
            >
              Save
            </Button>
          </div>
        )}
      </div>

      <div className=" bg-white p-5 rounded-xl border border-solid border-gray-200">
        <Tabs
          defaultActiveKey="tab"
          className={`${selectedOption === "merchant" && "hidden"}`}
          items={[
            {
              label: "Mongolia",
              key: "mn",
            },
            {
              label: "English",
              key: "en",
            },
            {
              label: "Korea",
              key: "kr",
            },
            {
              label: "China",
              key: "cn",
            },
            {
              label: "Russia",
              key: "ru",
            },
          ]}
          onChange={(e) => {
            setLang(e);
          }} />

        <TextEditorForm
          value={bodyContent}
          setValue={setBodyContent}
          disabled={false}
          language={lang}
        />
      </div>


    </div>
  );
};

export default TermsTab;
