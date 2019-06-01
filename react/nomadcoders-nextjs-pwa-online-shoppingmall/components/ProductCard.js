import Link from 'next/link';
import { Card, Col, Icon } from 'antd';
import { Meta } from 'antd/lib/list/Item';

export default ({ id, name, subtitle, photoUrl }) => (
  <Col style={{ marginBottom: '25px' }}>
    <Card
      hoverable
      actions={[
        <Link href={`/product?id=${id}`} as={`/product/${id}`}>
          <a>
            <Icon type='eye' theme='outlined' />
          </a>
        </Link>
      ]}
      cover={<img alt='example' src={photoUrl} height={'200px'} />}
    >
      <Meta title={name} description={subtitle} />
    </Card>
  </Col>
);