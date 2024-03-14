import { useTranslation } from 'react-i18next';

import { BasicPage, FormRow } from './common';
import { updateConfig } from "@/utils/config";
import { TextInput } from '@/components/textInput';
import { SwitchBox } from "@/components/switchBox"
import { NumberInput } from '../numberInput';


export function STTWakeWordSettingsPage({
    sttWakeWordEnabled,
    sttWakeWord,
    sttWakeWordIdleTime,
    setSTTWakeWordEnabled,
    setSTTWakeWord,
    setSTTWakeWordIdleTime,
    setSettingsUpdated,
}: {
    sttWakeWordEnabled: boolean;
    sttWakeWord: string;
    sttWakeWordIdleTime: number;
    setSTTWakeWordEnabled: (wakeWordEnabled: boolean) => void;
    setSTTWakeWord: (wakeWord: string) => void;
    setSTTWakeWordIdleTime: (timeBeforeIdle: number) => void;
    setSettingsUpdated: (updated: boolean) => void;
}) {
    const { t } = useTranslation();

    return (
        <BasicPage
          title={`${t("Wake word")} ${t("Settings")}`}
          description={`${t("Configure")} ${t("Wake word")}`}
        >
            <ul role="list" className="divide-y divide-gray-100 max-w-xs">
                <li className="py-4">
                    <FormRow label={`${t("Use")} ${t("Wake word")}`}>
                        <SwitchBox
                            value={sttWakeWordEnabled}
                            label={`${t("Wake word")} ${t("Enabled")}`}
                            onChange={(value: boolean) => {
                                setSTTWakeWordEnabled(value);
                                updateConfig("wake_word_enabled", value.toString());
                                setSettingsUpdated(true);
                            }}
                        />
                    </FormRow>
                </li>
                { sttWakeWordEnabled && (
                    <>
                        <li className="py-4">
                            <FormRow label={`${t("Specify")} ${t("Wake word")}`}>
                                <TextInput
                                    value={sttWakeWord}
                                    onChange={(event: React.ChangeEvent<any>) => {
                                        setSTTWakeWord(event.target.value);
                                        updateConfig("wake_word", event.target.value);
                                        setSettingsUpdated(true);
                                    }}
                                />
                            </FormRow>
                        </li>
                        <li className="py-4">
                            <FormRow label={`${t("Set time before bot go idle")}(${t("sec")})`}>
                                <NumberInput
                                    value={sttWakeWordIdleTime}
                                    min={0}
                                    max={60 * 60}
                                    onChange={(event: React.ChangeEvent<any>) => {
                                        setSTTWakeWordIdleTime(event.target.value);
                                        updateConfig("wake_word_time_before_idle_sec", event.target.value);
                                        setSettingsUpdated(true);
                                    }}
                                />
                            </FormRow>
                        </li>
                    </>
                )}
            </ul>
        </BasicPage>
  );
}