import mwparserfromhell
import re
import xml.etree.ElementTree as etree

def loadWikimedia(source_file):
    tree = etree.parse(source_file)
    root = tree.getroot()
    namespace = getNamspace(root.tag)
    kg = {}
    for page in root.findall('./' + namespace + 'page'):
        title = page.find(namespace + 'title').text
        page_content = page.findall(
            './' + namespace + 'revision/' + namespace + 'text')
        entry = {}
        if len(page_content) > 0:
            wikicode = mwparserfromhell.parse(page_content[0].text)
            templates = wikicode.filter_templates()
            for template in templates:
                #print(template.name)
                for param in template.params:
                    value = stripWikilinksForText(str(param.value)).strip()
                    if len(value) > 0:
                        entry[str(param.name).strip()] = value
        kg[title] = entry
    return kg

# 위키미디아 스타일 링크에서 텍스트만을 추출하는 helper function 입니다.
def stripWikilinksForText(wikilink):
    return re.sub(r'\[\[(.+?)\|.+?\]\]', r'\1', wikilink).replace('[[', '').replace(']]', '')

# XML 의 namespace 를 찾아 돌려줍니다.
def getNamspace(tag):
    return '{' + tag.split('}')[0].strip('{') + '}'
