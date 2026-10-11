evaluation_report = {
    "tool_recall": 0.96,
    "tool_precision": 0.92,
    "parameter_accuracy": 0.94,
    "critical_bug_count": 0
}

quality_thresholds = {
    "minimum_tool_recall": 0.95,
    "minimum_tool_precision": 0.90,
    "minimum_parameter_accuracy": 0.95,
    "maximum_critical_bug_count": 0
}

def check_quality_gate(report, thresholds):
    failed_reasons = []

    if report["tool_recall"] < thresholds["minimum_tool_recall"]:
        failed_reasons.append("tool recall이 기준보다 낮습니다.")

    if report["tool_precision"] < thresholds["minimum_tool_precision"]:
        failed_reasons.append("tool precision이 기준보다 낮습니다.")

    if report["parameter_accuracy"] < thresholds["minimum_parameter_accuracy"]:
        failed_reasons.append("parameter accuracy가 기준보다 낮습니다.")

    if report["critical_bug_count"] > thresholds["maximum_critical_bug_count"]:
        failed_reasons.append("critical bug가 존재합니다.")

    can_deploy = len(failed_reasons) == 0

    return {
        "can_deploy": can_deploy,
        "failed_reasons": failed_reasons
    }


gate_result = check_quality_gate(evaluation_report, quality_thresholds)

print(gate_result)


